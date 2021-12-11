const {
    FederatedCredential,
} = require('../entities');

exports.getFederatedCredential = (provider, subject) =>
    FederatedCredential.findOne({
        where: {
            provider,
            subject,
        },
    });

exports.createFederatedCredential = ({ provider, subject, userId }, transaction) =>
    FederatedCredential.create({
        provider,
        subject,
        user_id: userId,
    }, { transaction });
