const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const CONSTANTS = require('../../lib/constants');

const USER_TYPES = [CONSTANTS.BUYER, CONSTANTS.SELLER];

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is required'],
      minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
      unique: true,
      validate: [validator.isEmail, 'Email is not valid']
    },
    password: {
      type: String,
      required: [true, 'Passowrd is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password confirm is required'],
      validate: {
        validator: function(val) {
          return val === this.password;
        },
        message: 'Password confirmation must match password'
      },
      select: false
    },
    userType: {
      type: String,
      enum: USER_TYPES,
      required: [true, 'User type is required']
    },
    profile: {
      address: {
        type: String
      },
      phone: {
        type: String
      },
      avatarUrl: {
        type: String
      },
      thumbnailUrl: {
        type: String
      }
    },
    passwordChangedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    error.field = 'email';
    error.duplicateMessage = 'Email already taken';
  }

  next(error);
});

userSchema.methods.passwordChanged = function(JWTTimeStamp) {
  return (
    this.passwordChangedAt &&
    parseInt(this.passwordChangedAt.getTime() / 1000, 10) > JWTTimeStamp
  );
};

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
