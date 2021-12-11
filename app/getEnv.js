require('dotenv').config();
const uuid = require('uuid').v4;
const pkg = require('../package.json');

const {
    NODE_ENV = 'production',
    SERVER_ID = uuid(),
    PORT = 80,

    SERVER_HOST_NAME,

    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,

    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,

    DB_DATABASE,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,

} = process.env;

module.exports = {
    VERSION: pkg.version,
    NODE_ENV,
    SERVER_ID,
    PORT,

    SERVER_HOST_NAME,

    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,

    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,

    DB_DATABASE,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
};
