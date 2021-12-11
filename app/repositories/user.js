const crypto = require('crypto');
const { User } = require('../entities');
const {
    getRandomSalt,
    doHashedPassword,
} = require('../utils/hash');


exports.getUser = async id => await User.findByPk(id);

exports.updateUserName = async (id, name) => {
    const user = await User.findByPk(id);
    if (user) {
        user.name = name;
        await user.save();
    }

    return user;
};

exports.findUserByEmail = email => User.findOne({
    where: {
        email,
    },
});

exports.createLocalUser = async ({ email, name, password }, trasanction) => {
    const salt = getRandomSalt();
    const hashedPassword = await doHashedPassword(password, salt);

    const user = await User.create({
        email,
        name,
        salt,
        hashed_password: hashedPassword,
        is_email_verify: false,
    }, { trasanction });

    return user;
};

exports.activeUserEmailVerify = async userId => {
    const user = await User.findByPk(userId);
    if (user) {
        user.is_email_verify = true;
        await user.save();
    }

    return user;
};

exports.createThirdPartyUser = ({ name }, trasanction) => User.create({
    name,
    is_email_verify: true,
}, { trasanction });

exports.isPasswordEqualHashed = async (hashedPassword, password, salt) => {
    const currentHashedPassword = await doHashedPassword(password, salt);
    return crypto.timingSafeEqual(currentHashedPassword, hashedPassword);
};

exports.updateUserPassword = async (id, { password }, transaction) => {
    const user = await User.findByPk(id);

    if (user) {
        const salt = getRandomSalt();
        const hashedPassword = await doHashedPassword(password, salt);

        user.salt = salt;
        user.hashed_password = hashedPassword;
        await user.save({
            transaction,
        });
    }

    return user;
};
