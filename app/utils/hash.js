const crypto = require('crypto');

exports.getRandomSalt = () => crypto.randomBytes(16);

exports.doHashedPassword = (password, salt) =>
    new Promise((resolve, reject) =>
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(hashedPassword);
        }));

