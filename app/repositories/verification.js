const { Verification } = require('../entities');
const { nanoid } = require('nanoid');

exports.getUserVerification = token => Verification.findByPk(token);

exports.removeUsersVerifications = (userId, transaction) =>
    Verification.destroy(
        {
            where: { user_id: userId },
            transaction,
        },
    );

exports.createUserVerification = ({ userId, expiredAt }, transaction) =>
    Verification.create(
        {
            user_id: userId,
            expired_at: expiredAt,
            token: nanoid(48),
        },
        { transaction },
    );
