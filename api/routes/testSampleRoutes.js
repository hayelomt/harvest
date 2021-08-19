const router = require('express').Router();
const testSampleController = require('../controllers/testSampleController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/ping', testSampleController.ping);

router.get('/ping/auth', authMiddleware.protect, testSampleController.ping);

router.get(
  '/ping/authorize',
  authMiddleware.protect,
  authMiddleware.requireRole('SELLER'),
  testSampleController.ping
);

module.exports = router;
