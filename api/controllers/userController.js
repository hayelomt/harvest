const multer = require('multer');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const CONSTANTS = require('../../lib/constants');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CONSTANTS.UPLOAD_DIRECTORY);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const randomNumber = parseInt(Math.random() * 1000000000, 10);
    cb(null, `profile-${randomNumber}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0].startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload images only', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.updateUser = catchAsync(async (req, res, next) => {
  console.log('File', req.file);
  console.log('Body', req.body);

  res.json({
    success: true,
    uploadd: req.file
  });
});
