const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => res.render('index'));
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));

module.exports = router;
