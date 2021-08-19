const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout', authController.logOut);
router.post('/whoami/:token', authController.whoAmI);

module.exports = router;
