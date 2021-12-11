const nodemailer = require('nodemailer');
const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
} = require('../getEnv');

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});

exports.sendMail = async ({ from, to, subject, html } = {}) => {
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
    });

    return info;
};
