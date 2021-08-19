/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const CONSTANTS = require('../../lib/constants');
const User = require('../models/UserModel');

const dev = process.env.NODE_ENV !== 'production';

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const sendUserToken = (user, statusCode, res, persist = false) => {
  const token = signToken(user._id);
  const cookieOptions = {
    secure: !dev,
    httpOnly: true,
    signed: true
  };

  if (persist) {
    cookieOptions.maxAge = process.env.JWT_COOKIE_EXPIRES_IN;
  }

  user.password = undefined;

  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      user
    }
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const {
    email,
    password,
    passwordConfirm,
    name,
    profile,
    userType
  } = req.body;

  let address;
  let phone;
  let avatarUrl;
  let thumbnailUrl;

  if (profile) {
    address = profile.address;
    phone = profile.phone;
    avatarUrl = profile.avatarUrl;
    thumbnailUrl = profile.thumbnailUrl;
  }

  const user = await User.create({
    email,
    password,
    passwordConfirm,
    name,
    profile: {
      address,
      phone,
      avatarUrl,
      thumbnailUrl
    },
    userType
  });

  user.password = undefined;
  res.status(201).json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Signed up successfully',
    data: {
      user
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, keepLoggedIn } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 400));
  }

  sendUserToken(user, 200, res, keepLoggedIn);
});

exports.whoAmI = catchAsync(async (req, res, next) => {
  const decoded = await promisify(jwt.verify)(
    req.params.token,
    process.env.JWT_SECRET
  );

  const freshUser = await User.findById(decoded.id);

  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Who am i',
    data: {
      user: freshUser
    }
  });
});

exports.logOut = (req, res, next) => {
  res.clearCookie('token');

  res.json({
    status: CONSTANTS.SUCCESS_STATUS,
    message: 'Logged out successfully',
    data: null
  });
};
