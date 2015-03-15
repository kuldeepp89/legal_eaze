'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({

  local: {
    email: { type: String, lowercase: true, index: { unique: true, sparse: true }},
    password: String,
  },

  profile: {
    name: { type: String, default: '' },
    age: { type: Number, default: 0 },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    mobile: {type: Number, default: ''},
    state: {type: String, default: ''},
    pin: {type: String, default: ''}
  },

  keys: {
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    varifiedAccountToken: String,
    varifiedAccountTokenExpires: Date 
  },

  mata: {
    isVerified: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    lastLogin: { type: Date },
    joinedAt: { type: Date, default: Date.now },
    isPremium: {type: Boolean, default: false},
  },
  isDisable: {type: Boolean, default: false},
  noMatter: {type: Number, default:0},
  planName: {type: String},
  planStartDate: { type: Date}

});

/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */
UserSchema.pre('save', function(next) {
  console.log("UserSchema pre save :: Started");
  var user = this;

  if (!user.isModified('local.password')) return next();

  console.log("UserSchema pre save :: Starting");
  bcrypt.genSalt(5, function(err, salt) {
    console.log("UserSchema pre save :: Bcrypt gensalt callback");
    if (err) return next(err);
    bcrypt.hash(user.local.password, salt, null, function(err, hash) {
      console.log("UserSchema pre save :: Bcrypt hash callback");
      if (err) return next(err);
      user.local.password = hash;
      console.log("UserSchema pre save :: Bcrypt hash callback done");
      next();
    });
  });
});
/**
 * Validate user's password.
 * Will be Used by Passport-Local Strategy for password validation.
 */
UserSchema.methods.validatePassword = function(cPassword, callback) {
  console.log('password isMatch');
  bcrypt.compare(cPassword, this.local.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};



module.exports = mongoose.model('User', UserSchema);
