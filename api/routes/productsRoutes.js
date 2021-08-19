const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const productsController = require('../controllers/productsController');
const CONSTANTS = require('../../lib/constants');

router
  .route('/')
  .get(productsController.index)
  .post(
    authMiddleware.protect,
    authMiddleware.requireRole(CONSTANTS.SELLER),
    productsController.store
  );

router.get('/item/:_id', productsController.getProductDetailsById);
router.get('/latest', productsController.showLatestProducts);
router.get('/latest/:index', productsController.showLatestProductsByIndex);
router.get(
  '/latest/:category/:index',
  productsController.showRefinedProductsByIndex
);

router
  .route('/uploads')
  .get(
    authMiddleware.protect,
    authMiddleware.requireRole(CONSTANTS.SELLER),
    productsController.userUploadedProducts
  );

router.get(
  '/ping',
  (req, res, next) => {
    console.log('inside pingg');
    next(new Error('next error..'));
  },
  productsController.ping
);

module.exports = router;
