const mongoose = require('mongoose');
// const validator = require('validator');
const CONSTANTS = require('../../lib/constants');

const PRODUCT_CATEGORIES = [
  CONSTANTS.CROP,
  CONSTANTS.DAIRY,
  CONSTANTS.FRUIT,
  CONSTANTS.VEGITABLES,
  CONSTANTS.CEREAL
];

const productSchema = mongoose.Schema(
  {
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Product name field is required.']
    },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: [true, 'Category field is required.']
    },
    quantity: {
      type: Number,
      required: [true, 'Product name field is required.']
    },
    price: {
      type: Number,
      required: [true, 'Price field is required.']
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: '/static/assets/default.png'
    }
  },
  {
    timestamp: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
