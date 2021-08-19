const router = require('express').Router();
const imageUploadController = require('../controllers/imageUploadController');

router.route('/').post(imageUploadController.store);

// router.get(
//   '/ping',
//   (req, res, next) => {
//     console.log('inside pingg');
//     next(new Error('next error..'));
//   },
//   imageUploadController.ping
// );

// router
//   .route('/:id')
//   .get(imageUploadController.show)
//   .patch(imageUploadController.update)
//   .delete(imageUploadController.delete);

module.exports = router;
