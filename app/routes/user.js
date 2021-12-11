const { body } = require('express-validator');
const Router = require('express').Router;
const router = Router();
const {
    ensureAuthenticatedAndEmailVerify,
    formValidateThrowJson,
} = require('../middlewares');
const user = require('../controllers/user');

router.get('/info', ensureAuthenticatedAndEmailVerify, user.info);
router.patch('/name',
    [
        ensureAuthenticatedAndEmailVerify,
        body('name').exists().notEmpty().withMessage('must input name'),
        formValidateThrowJson,
    ],
    user.changeName,
);

module.exports = router;
