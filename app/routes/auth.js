const { body } = require('express-validator');
const passport = require('passport');
const Router = require('express').Router;
const {
    ensureAuthenticated,
    ensureAuthenticatedAndEmailVerify,
    ensureIsLocalEmailAccount,
    formValidateThrowRedirect,
    wrap,
} = require('../middlewares');
const { passwordRegExp } = require('../utils/regexp');
const auth = require('../controllers/auth');
const router = Router();

const passwordVerifyMiddlewares = [
    body('password').exists().matches(passwordRegExp).withMessage('must Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];

router.get('/register', auth.signupPage);
router.post('/register',
    [
        body('email').exists().isEmail().withMessage('must be email'),
        ...passwordVerifyMiddlewares,
        formValidateThrowRedirect('/auth/register'),
    ],
    wrap(auth.signup),
);

// Local
router.get('/login',
    (req, res, next) =>
        req.isAuthenticated() ? res.redirect('/user/info') : next(),
    auth.loginPage,
);
router.post('/login',
    [
        body('email').exists().notEmpty().withMessage('must input email'),
        body('password').exists().notEmpty().withMessage('must input password'),
        formValidateThrowRedirect('/auth/login'),
    ],
    passport.authenticate('local', {
        successRedirect: '/user/info',
        failureRedirect: '/auth/login',
        failureMessage: true,
    }),
);
router.get('/sent_verify_mail',
    ensureAuthenticated,
    wrap(auth.sentVerifyMailPage),
);
router.post('/sent_verify_email',
    ensureAuthenticated,
    wrap(auth.sentVerifyMail),
);
router.get('/verify_mail', wrap(auth.verifyMail));

router.get('/change_password',
    [
        ensureAuthenticatedAndEmailVerify,
        ensureIsLocalEmailAccount,
    ],
    auth.changePasswordPage,
);
router.post('/change_password',
    [
        ensureAuthenticatedAndEmailVerify,
        ensureIsLocalEmailAccount,
        body('old_password').exists().notEmpty().withMessage('must input old password'),
        ...passwordVerifyMiddlewares,
        body('password').custom((value, { req }) => {
            if (value === req.body.old_password) {
                throw new Error('new password is eqauls old password');
            }
            return true;
        }),
        formValidateThrowRedirect('/auth/change_password'),
    ],
    wrap(auth.changePassword),
);

// Facebook
router.post('/login/facebook', passport.authenticate('facebook'));
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        assignProperty: 'federatedUser',
        failureRedirect: '/auth/login',
    }),
    wrap(auth.onThirdPartyLogin),
);

// Google
router.post('/login/google', passport.authenticate('google'));
router.get('/login/google/callback',
    passport.authenticate('google', {
        assignProperty: 'federatedUser',
        failureRedirect: '/auth/login',
    }),
    wrap(auth.onThirdPartyLogin),
);

router.get('/logout', auth.logout);
module.exports = router;
