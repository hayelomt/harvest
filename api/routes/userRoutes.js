const router = require('express').Router();
const userController = require('../controllers/userController');

router.patch('/', userController.uploadUserPhoto, userController.updateUser);

module.exports = router;
