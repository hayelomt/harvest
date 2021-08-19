const AppError = require('../../utils/AppError');
const CONSTANTS = require('../../lib/constants');

const handleValidationErrorDB = error => {
  const { errors } = error;
  const newErrors = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(errors).map(key => {
    newErrors[key] = errors[key].message;
  });

  return new AppError('Invalid Input Data', 400, newErrors);
};

const handleDuplicateError = error => {
  console.log('Dup msg', error.duplicateMessage);
  const newError = {
    [error.field]: error.duplicateMessage
  };
  console.log('New error', newError);

  return new AppError('Invalid Input Data', 400, newError);
};

const handleJWTError = res => {
  res.clearCookie('token');
  return new AppError('Token invalid. Please login again', 401);
};

const handleJWTExpired = res => {
  res.clearCookie('token');
  return new AppError('Token expired. Please login again', 401);
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      data: err.data
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    });
  }
};

const handleCastError = () => {
  return new AppError('Invalid Data detected', 400);
};

const sendErrorDev = (err, formattedError, res) => {
  res.status(formattedError.statusCode).json({
    status: err.status,
    message: formattedError.message,
    data: formattedError.data,
    error: err,
    errMsg: err.message,
    stack: err.stack
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || CONSTANTS.ERROR_STATUS;

  let error = err;

  // TODO handle id parsing error

  // Handle duplicate validation mongo error
  if (err.code === 11000) {
    error = handleDuplicateError(err);
  }
  // Handle valdiation mongo error
  else if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(err);
  }
  // Handle invalid json web token error
  else if (err.name === 'JsonWebTokenError') error = handleJWTError(res);
  // Handle token expired error
  else if (err.name === 'TokenExpiredError') error = handleJWTExpired(res);
  // Handle Cat error
  else if (err.name === 'CastError') error = handleCastError();

  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, error, res);
  }
};
