'use strict';

var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var DwollaStrategy = require('passport-dwolla').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


var User = require('../models/user');
var secrets = require('../config/secrets');

// =============================================================================
// User Serialiation -----------------------------------------------------------
// -----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// =============================================================================

// =============================================================================
// Signin Required middleware --------------------------------------------------
// -----------------------------------------------------------------------------
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated() && !req.user.isDisable) return next();
  res.redirect('/login');
};
// =============================================================================

// =============================================================================
// Authorization Required middleware -------------------------------------------
// -----------------------------------------------------------------------------
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];
  if (_.findWhere(req.user.tokens, { kind: provider })) next();
  else res.redirect('/login');
};
// =============================================================================

// =============================================================================
// Local Login --------------------------------------------------------------
// -----------------------------------------------------------------------------
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ 'local.email': email }, function(err, user) {
      if (!user) {
        return done(null, false, { message: 'Invalid email.. or password.' });
      }
      user.validatePassword(password, function(err, isMatch) {
        if (isMatch) {
          console.log('varify' + user.mata.isVerified);
          if(user.mata.isVerified) {
            return done(null, user);  
          }
          else {
            return done(null, false, { message: 'You have not verified your account, please verify it.' });  
          }
          
        }
        else {
          return done(null, false, { message: 'Invalid email or password.' });
        }
      });
    });
  }));


// =============================================================================
