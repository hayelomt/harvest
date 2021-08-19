class AppError extends Error {
  constructor(message, statusCode, errData = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.data = errData;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
