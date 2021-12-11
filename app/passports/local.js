const passport = require('passport');
const Strategy = require('passport-local');
const {
    findUserByEmail,
    isPasswordEqualHashed,
} = require('../repositories/user');
const createVerifyMailJob = require('../jobs/createVerifyMail');


passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, cb) => {
            try {
                const user = await findUserByEmail(email);
                if (!user) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }

                const isEqual = await isPasswordEqualHashed(user.hashed_password, password, user.salt);
                if (!isEqual) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }

                if (!user.is_email_verify) {
                    createVerifyMailJob(user.id)
                        .catch(error => console.error(error));
                }

                return cb(null, {
                    id: user.id,
                    provider: 'local',
                    email: user.email,
                    is_email_verify: user.is_email_verify,
                });
            }
            catch (error) {
                return cb(error);
            }
        },
    ),
);
