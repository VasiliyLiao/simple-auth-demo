const userRepository = require('../repositories/user');
const federatedCredentialRepository = require('../repositories/federated_credentials');
const verificationRepository = require('../repositories/verification');
const createVerifyMailJob = require('../jobs/createVerifyMail');

const loginUser = (req, { id, provider, email, is_email_verify }) =>
    new Promise((resolve, reject) =>
        req.login(
            {
                id,
                provider,
                email,
                is_email_verify,
            },
            err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            },
        ),
    );

exports.signupPage = (req, res) => {
    res.render('register');
};

exports.signup = async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    if (await userRepository.findUserByEmail(email)) {
        req.session.messages = ['the email already in use.'];
        return res.redirect('/auth/register');
    }

    const name = email.split('@')[0];
    const user = await userRepository.createLocalUser({ email, name, password });
    await loginUser(req, {
        id: user.id,
        provider: 'local',
        email: user.email,
        is_email_verify: false,
    });

    createVerifyMailJob(user.id)
        .catch(error => console.error(error));

    res.redirect('/user/info');
};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.sentVerifyMailPage = async (req, res) => {
    // real check is email verify
    const user = await userRepository.getUser(req.user.id);
    if (user.is_email_verify) {
        return res.redirect('/user/info');
    }

    res.render('send_verifiy_mail');
};

exports.sentVerifyMail = (req, res) => {
    createVerifyMailJob(req.user.id)
        .catch(error => console.error(error));

    res.json({
        message: 'sent',
    });
};

exports.verifyMail = async (req, res) => {
    const {
        token,
    } = req.query;

    if (!token) {
        return res.status(400).send('The verify token is empty');
    }

    const verification = await verificationRepository.getUserVerification(token);
    if (!verification) {
        return res.status(400).send('The verify token is error');
    }

    if (verification.expired_at.getTime() <= new Date().getTime()) {
        return res.status(400).send('The verify url is expired.');
    }

    const user = await userRepository.activeUserEmailVerify(verification.user_id);
    await verificationRepository.removeUsersVerifications(verification.user_id)
        .catch(error => console.error(error));

    await loginUser(req, {
        id: user.id,
        provider: 'local',
        email: user.email,
        is_email_verify: true,
    });

    res.redirect('/user/info');
};

exports.onThirdPartyLogin = async (req, res) => {
    const {
        id,
        displayName,
        emails,
        provider,
    } = req.federatedUser;
    const email = emails[0].value;
    const federatedCredential = await federatedCredentialRepository.getFederatedCredential(provider, id);
    let user = null;
    if (!federatedCredential) {
        // no register
        // TODO: must add transaction
        user = await userRepository.createThirdPartyUser({ name: displayName });
        await federatedCredentialRepository.createFederatedCredential({
            provider,
            subject: id,
            userId: user.id,
        });
    }
    else {
        user = await userRepository.getUser(federatedCredential.user_id);
    }

    await loginUser(req, {
        id: user.id,
        provider,
        email,
        is_email_verify: true,
    });

    res.redirect('/user/info');
};

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.logout = logout;

exports.changePasswordPage = (req, res) => {
    res.render('change_password');
};

exports.changePassword = async (req, res) => {
    const {
        old_password,
        password,
    } = req.body;

    const user = await userRepository.getUser(req.user.id);
    const isCorrectPassword = await userRepository.isPasswordEqualHashed(user.hashed_password, old_password, user.salt);
    if (!isCorrectPassword) {
        req.session.messages = ['the password is incorrect'];
        res.redirect('/auth/change_password');
        return;
    }

    await userRepository.updateUserPassword(req.user.id, { password });
    res.redirect('/user/info');
};
