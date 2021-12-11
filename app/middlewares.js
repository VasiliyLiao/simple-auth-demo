const { validationResult } = require('express-validator');

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login');
};

exports.ensureAuthenticatedAndEmailVerify = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.is_email_verify) {
            // email verify user(local provider)
            // third party login user
            return next();
        }

        return res.redirect('/auth/sent_verify_mail');
    }

    res.redirect('/auth/login');
};

exports.ensureIsLocalEmailAccount = (req, res, next) => {
    if (req.user) {
        if (req.user.provider === 'local') {
            return next();
        }
    }
    res.redirect('/user/info');
};

/**
 * wrap express async method
 */
exports.wrap = cb =>
    (req, res, next) =>
        cb(req, res, next).catch(error => next(error));

exports.formValidateThrowRedirect = failureRedirect =>
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.messages = errors.array().map(val => val.msg);
            res.redirect(failureRedirect);
            return;
        }
        next();
    };

exports.formValidateThrowJson = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array(),
        });
        return;
    }

    next();
};

