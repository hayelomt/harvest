const catchAsync = require('../../utils/catchAsync');
const CONSTANTS = require('../../lib/constants');
const Product = require('../models/ProductModel');

exports.showLatestProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .sort({ _id: -1 })
    .limit(10);
  if (products.length !== 0) {
    res.json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: 'the last 10 latest products',
      data: {
        products
      }
    });
  } else {
    res.json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: 'no results to show',
      data: {
        products: [
          {
            _id: '231rt',
            description: 'No results to show',
            name: '',
            imageurl: '',
            category: ''
          }
        ]
      }
    });
  }
});
exports.showLatestProductsByIndex = catchAsync(async (req, res, next) => {
  const index = 12 * req.params.index;
  const products = await Product.find()
    .sort({ _id: -1 })
    .limit(12)
    .skip(index);
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'the last 10 latest products',
    data: {
      products
    }
  });
});
exports.showRefinedProductsByIndex = catchAsync(async (req, res, next) => {
  const index = 12 * req.params.index;
  const { category } = req.params;
  const products = await Product.find({ category })
    .sort({ _id: -1 })
    .limit(12)
    .skip(index);
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'the last 10 refined latest products by cartegory',
    data: {
      products
    }
  });
});

exports.index = catchAsync(async (req, res, next) => {
  const products = await Product.find({}).populate('uploader');

  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'All Products.',
    data: {
      products
    }
  });
});
exports.getProductDetailsById = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const product = await Product.findOne({ _id });
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'product detail',
    data: {
      product
    }
  });
});
exports.store = catchAsync(async (req, res, next) => {
  // Not a gud create (doesnt sanitize)
  req.body.uploader = req.user._id;

  // console.log(req.body);
  const product = await Product.create(req.body);

  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Product created successfully',
    data: product
  });
});

exports.userUploadedProducts = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const products = await Product.find({
    uploader: userId
  });

  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Products uploaded',
    data: {
      products
    }
  });
});

exports.ping = (req, res) => {
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Ping',
    data: {}
  });
};
