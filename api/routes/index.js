const router = require('express').Router();
const testSampleRoute = require('../routes/testSampleRoutes');
const authRoutes = require('./authRoutes');
const imageUploadRoute = require('./imageUploadRoute');
const productsRoutes = require('./productsRoutes');
const providersRoute = require('./providersRoute');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/upload-image', imageUploadRoute);
router.use('/providers', providersRoute);
router.use('/users', userRoutes);

router.use('/test', testSampleRoute);

module.exports = router;
