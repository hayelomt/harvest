const router = require('express').Router();
const providersController = require('../controllers/providersController');

router.route('/').get(providersController.index);

module.exports = router;
