// const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

const catchAsync = require('../../utils/catchAsync');
const CONSTANTS = require('../../lib/constants');

exports.index = catchAsync(async (req, res, next) => {
  const providers = await User.find({ userType: 'seller'.toUpperCase() });
  if (providers) {
    const providersName = [];
    providers.forEach(user => providersName.push(user.name));
    res.json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: 'All Products and all users',
      data: {
        providersName
      }
    });
  } else {
    res
      .status(400)
      .json({ status: CONSTANTS.ERROR_STATUS, message: 'No Providers found.' });
  }
});

// exports.show = catchAsync(async (req, res, next) => {
//   const productId = req.params.id;
//   const product = await Product.findById(testSampleId);

//   res.json({
//     status: CONSTANTS.SUCCESS_STATUS,
//     message: 'Product sample',
//     data: {
//       product
//     }
//   });
// });

exports.ping = (req, res) => {
  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Ping',
    data: {}
  });
};
