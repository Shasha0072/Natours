const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name.'],
    },
    email: {
      type: String,
      required: [true, 'User must have a email'],
      lowercase: true,
      validate: {
        validator: function (v) {
          const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return re.test(v);
        },
        message: 'Enter a valid email.',
      },
    },
    photo: { type: String },
    password: {
      type: String,
      required: [true, 'User must have a password.'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please enter the same password.'],
      minlength: 8,
      validate: {
        // This Only Works on Create and Save.
        validator: function (el) {
          return this.password === el;
        },
        message: 'Password are not the same',
      },
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

// userSchema.pre('save', function (next) {
//   if (this.password !== this.passwordConfirm) {
//     next(new AppError('Password and confirm password should be same', 500));
//   }
//   next();
// });

userSchema.pre('save', async function (next) {
  // Only Run These Function if password was modified
  if (!this.isModified('password')) return next();
  // Hash the password with the cost of 12
  // delete the passwordConfirm field
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
