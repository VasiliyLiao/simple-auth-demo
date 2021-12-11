// Warning: if in the production must use rabbitmq/redis job/queue
const fastq = require('fastq');
const {
    SERVER_HOST_NAME,
} = require('../getEnv');
const {
    getUser,
} = require('../repositories/user');
const {
    removeUsersVerifications,
    createUserVerification,
} = require('../repositories/verification');
const mailService = require('../services/mail');

const sendVerifyMailWorker = async userId => {
    try {
        const user = await getUser(userId);
        await removeUsersVerifications(userId);
        const expiredAt = new Date();
        expiredAt.setHours(expiredAt.getHours() + 1);

        const verification = await createUserVerification({ userId, expiredAt });
        const verifyUrl = `https://${SERVER_HOST_NAME}/auth/verify_mail?token=${verification.token}`;
        console.log(verifyUrl);
        await mailService.sendMail({
            from: 'SimpleAuth System <vasiliy@simpleauth.test.com>',
            to: user.email,
            subject: 'SimpleAuth Email Verify',
            html: `<p>Click Here To Verify: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
        });
    }
    catch (error) {
        console.error(error);
    }
};

const queue = fastq(sendVerifyMailWorker, 2);

module.exports = async userId =>
    await queue.push(userId);

