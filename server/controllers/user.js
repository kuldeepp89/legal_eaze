'use strict';


var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var sha512 = require('sha512');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/user');
var config = require('../config')("");
var commonFunc = require('./commonFunc');
var UserCtl = module.exports;
var mkdirp = require('mkdirp');
var fs = require('fs');
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');
var UserCaseDetail = require('../models/userCaseDetail');
var CaseDetail = require('../models/caseDetail');
var PlanDetail = require('../models/planDetail');
var request = require('request');




// =============================================================================
// Login page ------------------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /auth/Login
 * SignIn page.
 */
UserCtl.getLogin = function(req, res) {
  if(req.user !== undefined && req.user.mata !== undefined && req.user.mata.isVerified){
      return res.redirect('/home');
  }
  else {
    res.render('index', {
    topbarBrand: 'Legal Eaze',
    title: 'LogIn'
  });  
  }
  
};
// =============================================================================

// =============================================================================
// Login post for local login --------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * POST /auth/login
 * Log in using email and password.
 * @param email
 * @param password
 */
UserCtl.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      console.log("User"+user);
      return res.redirect(req.session.returnTo || '/home');
      
    });
  })(req, res, next);
};



// =============================================================================

// =============================================================================
// Logout ------------------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /auth/logout
 * Log out.
 */
UserCtl.getLogout = function(req, res) {
  req.logout();
  res.redirect('/');
};
// =============================================================================

// =============================================================================
// Register page ------------------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /auth/register
 * Signup page.
 */
UserCtl.getRegister = function(req, res) {
  console.log('isEmail' + req.user);
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  if (req.user && req.user.mata.isVerified) return res.redirect('/');
  res.render('user/register', {
    topbarBrand: 'Legal Eaze',
    title: 'Register Account'
  });
};
// =============================================================================

// =============================================================================
// Post for local register -----------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * POST /auth/register
 * Create a new local account.
 * @param email
 * @param password
 */
UserCtl.postRegister = function(req, res, next) {
  console.log('start register');
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/register');
  }
  console.log(req.body.name);

  var user = new User({
    local: {
      email: req.body.email,
      password: req.body.password
    },
    profile: {
      name: req.body.name
    }
  });

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        req.flash('errors', { msg: 'User with that email already exists.' });
      }
      return res.redirect('/register');
    }

    
    async.waterfall([
      function(done) {
        crypto.randomBytes(16, function(err, buf) {
          if(err) console.log(err);
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) { 

        user.keys.varifiedAccountToken = token;
        user.keys.varifiedAccountTokenExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          if(err) console.log(err);
          done(err, token, user);
        });
      
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
            user: config.secrets.nodeMailer.gmail.email,
            pass: config.secrets.nodeMailer.gmail.password
          }
        });
        var mailOptions = {
          to: user.local.email,
          from: 'legalease.dummy@gmail.com',
          subject: 'Legal Eaze - Account Verification',
          text: 'You are receiving this email because you (or someone else) ' +
            'have requested to register for your Legal Eaze account.\n\n' +
            'Please click on the following link, or paste this into your ' +
            ' browser to verify your account:\n\n' +
            'http://legaleaze.in/verify_account/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your' +
            'password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      User.findOne({'local.email': req.body.email}, function(err, user) {
        if(err) console.log(err);
        if(user) {
          req.flash('info', { msg: 'An e-mail has been sent to ' + user.local.email + ' for verification purpose, please verify your account ' });
          res.redirect('/register');    
        }
      })
      
    });
    
  });
  
};
// =============================================================================
 
// Get Verify account page -------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /Verify/:token
 * Reset Password page.
 */
exports.getVerifyAccount = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  User
    .findOne({ 'keys.varifiedAccountToken': req.params.token })
    .where('keys.varifiedAccountTokenExpires').gt(Date.now())
    .exec(function(err, user) {
      if (!user) {
        console.log('yaha par aa gaya');
        req.flash('errors', { msg: 'Account verification token is invalid or has expired.' });
        return res.redirect('/');
      }
      user.mata.isVerified =  true;
      console.log('isVerified updated' + user.mata.isVerified );
      user.save(function(err) {
        if(err) console.log(err);
        res.redirect('/');
      })
      
    });
};
// =============================================================================
// Get forgot password page ----------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = function(req, res) {
  res.render('user/forgot_password', {
    title: 'Forgot Password',
    topbarBrand: 'Legal Eaze'
  });
};
// =============================================================================

// =============================================================================
// Post forgot password -------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 * @param email
 */
UserCtl.postForgot = function(req, res, next) {
  req.assert('email', 'Please enter a valid email address.').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ 'local.email': req.body.email.toLowerCase() }, function(err, user) {
        if (!user) {
          req.flash('errors', { msg: 'No account with that email address exists.' });
          return res.redirect('/forgot');
        }

        user.keys.resetPasswordToken = token;
        user.keys.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: config.secrets.nodeMailer.gmail.email,
          pass: config.secrets.nodeMailer.gmail.password
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'legalease.dummy@gmail.com',
        subject: 'Legal Eaze - Password Reset',
        text: 'You are receiving this email because you (or someone else) ' +
          'have requested to reset the password for your Legal Eaze account.\n\n' +
          'Please click on the following link, or paste this into your ' +
          ' browser to complete the process:\n\n' +
          'http://legaleaze.in/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your' +
          'password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An e-mail has been sent to ' + user.local.email + ' with further instructions.' });
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};
// =============================================================================

// =============================================================================
// Get reset password page -------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  User
    .findOne({ 'keys.resetPasswordToken': req.params.token })
    .where('keys.resetPasswordExpires').gt(Date.now())
    .exec(function(err, user) {
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/forgot');
      }
      res.render('user/reset_password', {
        topbarBrand: 'Legal Eaze',
        title: 'Reset Password'
      });
    });
};
// =============================================================================

// =============================================================================



// Post reset password ---------------------------------------------------------
// -----------------------------------------------------------------------------
/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function(done) {
      User
        .findOne({ 'keys.resetPasswordToken': req.params.token })
        .where('keys.resetPasswordExpires').gt(Date.now())
        .exec(function(err, user) {
          if (!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }

          user.local.password = req.body.password;
          user.keys.resetPasswordToken = undefined;
          user.keys.resetPasswordExpires = undefined;

          user.save(function(err) {
            if (err) return next(err);
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: config.secrets.nodeMailer.gmail.email,
          pass: config.secrets.nodeMailer.gmail.password
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'legalease.dummy.com',
        subject: 'Legal Eaze - Password changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password of your account ' +
          user.local.email + ' has been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Success! Your password has been changed.' });
        done(err);
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
};

/*** GET /home* Home page.*/
UserCtl.getHome = function(req, res) {
  var currMonth = moment().startOf('month');
  var currMonthLast = moment().endOf('month');
  var sdate = moment(currMonth._d).subtract(1, 'month')._d;
  var edate = moment(currMonthLast._d).add(1, 'month')._d;
  console.log('currMonth ' + currMonth._d + 'value1 ' + sdate + 'value2 ' + edate );

  UserCaseDetail.find({'email': req.user.local.email}, {}, function(err, allCases) {
    if(err) console.log(err);
    var filteredCases = [];
    for(var i = 0; i< allCases.length; i ++) {
      if(allCases[i].supremeCourt !== undefined) {
        var scrapper = allCases[i].supremeCourt.scrapperHearingDate[allCases[i].supremeCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('supremeCourt scrapperHearingDate ' + scrapper);
        console.log("supremeCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case supremeCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            
          }
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case supremeCourt');
          filteredCases.push(allCases[i]);
        } 
      }  
      else if(allCases[i].delhiHighCourt !== undefined) {
        var scrapper = allCases[i].delhiHighCourt.scrapperHearingDate[allCases[i].delhiHighCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('delhiHighCourt scrapperHearingDate ' + scrapper);
        console.log("delhiHighCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case delhiHighCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
         
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case delhiHighCourt');
          filteredCases.push(allCases[i]);
        } 
      }
      
      else  if(allCases[i].greenTribunal !== undefined) {
        var scrapper = allCases[i].greenTribunal.scrapperHearingDate[allCases[i].greenTribunal.scrapperHearingDate.length-1].hearingDate; 
        console.log('greenTribunal scrapperHearingDate ' + scrapper);
        console.log("greenTribunal userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case greenTribunal with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
                  }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case greenTribunal');
          filteredCases.push(allCases[i]);
        } 
      }
          
      else if(allCases[i].telecomDispute !== undefined) {
        var scrapper = allCases[i].telecomDispute.scrapperHearingDate[allCases[i].telecomDispute.scrapperHearingDate.length-1].hearingDate; 
        console.log('telecomDispute scrapperHearingDate ' + scrapper);
        console.log("telecomDispute userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case telecomDispute with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
         
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case telecomDispute');
          filteredCases.push(allCases[i]);
        } 
      }
  
      else if(allCases[i].consumerDispute !== undefined) {
        var scrapper = allCases[i].consumerDispute.scrapperHearingDate[allCases[i].consumerDispute.scrapperHearingDate.length-1].hearingDate; 
        console.log('consumerDispute scrapperHearingDate ' + scrapper);
        console.log("consumerDispute userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case consumerDispute with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
          
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case consumerDispute');
          filteredCases.push(allCases[i]);
        } 
      }
      
      else if(allCases[i].karkarDooma !== undefined) {
        var scrapper = allCases[i].karkarDooma.scrapperHearingDate[allCases[i].karkarDooma.scrapperHearingDate.length-1].hearingDate; 
        console.log('supremkarkarDoomaeCourt scrapperHearingDate ' + scrapper);
        console.log("karkarDooma userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case karkarDooma with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
          
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case karkarDooma');
          filteredCases.push(allCases[i]);
        } 
      }
    
      
      else if(allCases[i].bifrCourt !== undefined) {
        var scrapper = allCases[i].bifrCourt.scrapperHearingDate[allCases[i].bifrCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('bifrCourt scrapperHearingDate ' + scrapper);
        console.log("bifrCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case bifrCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
          
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case bifrCourt');
          filteredCases.push(allCases[i]);
        } 
      } 

      else if(allCases[i].saket !== undefined) {
        var scrapper = allCases[i].saket.scrapperHearingDate[allCases[i].saket.scrapperHearingDate.length-1].hearingDate; 
        console.log('saket scrapperHearingDate ' + scrapper);
        console.log("saket userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          console.log('userHearingDate ' + user);

            if(user >= sdate && user <= edate) {
              console.log('aaj ka case saket with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
          
        }
        else  if(scrapper >= sdate && scrapper <= edate) {
          console.log('aaj ka case saket');
          filteredCases.push(allCases[i]);
        } 
      }

      else if(allCases[i].meeting !== undefined) {
       
        console.log("meeting userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;;

          if(user >= sdate && user <= edate) {
            console.log('aaj ka case meeting with userHearingDate');
            filteredCases.push(allCases[i]);
          }    
        } 
      }
    }
    console.log(filteredCases);
    console.log(req.user.mata.isPremium + " " + req.user.noMatter);
    if(req.user.mata.isPremium == false && req.user.noMatter >=5) {
      var isPremium = false;
    }
    else {
      var isPremium = true
    }

    res.render('homePage', {
      topbarBrand: 'Legal Eaze',
      title: 'Home',
      userName:req.user.profile.name,
      isPremium: isPremium,
      count: req.user.noMatter,
      allCases: filteredCases
    })
  });
  
};

/*** GET About US Page.*/
UserCtl.aboutUs = function(req, res) {
  res.render('aboutUs');
};

/*** GET subscription page.*/
UserCtl.subscription = function(req, res) {
  var savePlan = new PlanDetail({
    'small': '',
    'medium': '',
    'large' :''

  });
  

  PlanDetail.find({}, {}, function(err, allPlans){
    if(err) console.log(err);
    if(allPlans.length == 0) {
      savePlan.save(err, function(){
        if(err) console.log(err);
        console.log('planDetail saved');
      })
    }
  })
  
  res.render('subscription');
};

/*** GET about us page.*/
UserCtl.contactUs = function(req, res) {
  res.render('contactUs');
};

/*** GET privacy  page.*/
UserCtl.privacy = function(req, res) {
  res.render('privacySecurity');
};

/*** GET faq page.*/
UserCtl.faq = function(req, res) {
  res.render('faq');
};
/*** Delete a Case.*/
UserCtl.deleteCase = function(req, res) {
  var caseId = req.param('id');
  console.log(caseId);
  UserCaseDetail.remove({'_id': caseId}, function(err, caseFound){
    if(err) console.log(err)
    console.log('caseFound ' + caseFound);
    CaseDetail.update({'users': {$in: [caseId]}},  { $pull: { "users" : { $in: [caseId] }}}, function(err, found) {
      if(err) console.log(err)
      console.log("found " + found);  
      res.redirect('home');    
    })
  })
}

var shasum;
//Get Payment Page
UserCtl.getPaymentPage = function(req, res) {

  console.log(req.param('noOfSchedules'));
  var temp = Math.random() * Math.pow(10, 10);
  var payuId = temp.toFixed(0);
  var userName = req.user.profile.name;
  var userEmail = req.user.local.email;
  
  var money = 1.0;
  var plan = req.param('planName');
  var mobile = 8130857967;
  var address = req.user.profile.address;
  var udf1 = req.param('noOfSchedules');
  var udf2 = req.param('space');
  var pin = req.user.profile.pin;
  var state = req.user.profile.state;
  
  console.log(udf1 + udf2);
  //console.log(userName + " "+ userEmail + " mobile" + mobile + "address" + address + " " + pin);
  shasum = sha512("zzLz4z|"+payuId+ "|" +money+ "|" +plan+ "|" +userName+ "|" +userEmail+ "|"+ udf1 +"|"+  udf2 + "|||||||||VXtL4f0y");
  
  res.render('paymentInfo.jade', {
    salt: shasum.toString('hex'),
    txnid: payuId,
    name: userName,
    email: userEmail,
    plan: plan,
    amount: money,
    mobile: mobile,
    paymentToken: 0,
    udf1: udf1,
    udf2: udf2,
    address: address,
    pin: pin,
    state: state

  });
}


UserCtl.payment = function(req, res) {
  
 console.log(req.body);
 var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
            user: config.secrets.nodeMailer.gmail.email,
            pass: config.secrets.nodeMailer.gmail.password
          }
        });
        var mailOptions = {
          to: req.user.local.email,
          bcc: 'kuldeepp89@gmail.com',
          from: 'legalease.dummy@gmail.com',
          subject: 'Invoice/Payment Receipt',
          text:
            'Dear User,\n\n'+
            'We are pleased to inform you that you have been subscribed to the services of Legaleaze with following details: '+ '\n\n'+
            'Subscription Type: ' + req.body.productinfo + '\n'+
            'Maximum No of Schedules which can be maintained: ' + req.body.udf1+ '\n'+
            'Maximum Space to upload necessary documents: ' + req.body.udf2/1024+ " GB"+ '\n\n'+
            'Details of your transaction are as follows:\n'+
            'Subscription ID :' + req.body.mihpayid+ '\n'+
            'Order Date: ' +new Date()+ '\n'+
            'Invoice Date: ' +new Date()+ '\n'+

            'Subscription Charges: ' + req.body.net_amount_debit+ '\n'+
            'Tax: ' +   0.0+ ' \n'+
            'Total Paid Amount: ' + req.body.net_amount_debit +'\n\n'+

            'We wish to cope-up with your requirements.\n\n'+

            'For query or complaints, contact us:\n'+
            'Mobile Number: 8130857967\n'+
            'E-mail ID: contact@legaleaze.in\n\n'+

            'Thanks and regards\n'+
            'Legaleaze\n'+
            '801, Gokul Apartments\n'+
            '16/16 Civil Lines\n'+
            'Kanpur – 208001\n'
          };
          if(req.body.status != 'failure') {
            smtpTransport.sendMail(mailOptions, function(err) {
              if (err) {console.log(err)};
            });  
          }
          var isPremium = false;
          if(req.body.status === 'success') {
            isPremium = true;
          }

          
 res.render('paymentStatus.jade', {
  payment: req.body,
  status: req.body.status,
  amountPaid: req.body.net_amount_debit,
  paymentToken: 1,
  isPremium: isPremium

 });
}


UserCtl.postProfileEdit = function(req, res, next) {

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    console.log(req.body.state + "kdfkl") ;
    user.profile.name = req.body.name || '';
    user.profile.state = req.body.state || '';
    user.profile.address = req.body.address || '';
    user.profile.pin = req.body.pin || '';
    user.local.email = req.body.email || '';
    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Profile information updated.' });
      res.redirect('/payment/detail');
    });
  });

};