const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const User = require('../models/UserModel');

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Validate token is present
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in', 401, {
        message: 'token_not_provided'
      })
    );
  }

  // 2 Verify token (Validity and expiration)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check user exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('User has been removed.', 401));
  }

  // 4 Check password change
  if (freshUser.passwordChanged(decoded.iat)) {
    return next(
      new AppError('Passowrd has been changed. Please login again', 401)
    );
  }

  // Add user to request object
  req.user = freshUser;

  // User is authenticated go to next middleware
  next();
});

exports.requireRole = role => (req, res, next) => {
  if (req.user.userType === role) {
    next();
  } else {
    next(new AppError('You are not authorized to perfom this action', 403));
  }
};

exports.setAuthorizationHeader = (req, res, next) => {
  if (!req.headers.authorization) {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;

    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
  }

  next();
};
