'use strict';

var util = require('util');
var _ = require('lodash');
var async = require('async');
var passport = require('passport');
var User = require('../models/user');
var Scheduler = require('../models/scheduler');
var AdminCtl = module.exports;
var CommonFunc = require('./commonFunc');
var Scrap = require('../utils/scrapper');
var CaseDetail = require('../models/caseDetail');
var UserCaseDetail = require('../models/userCaseDetail');
var Logger = require('../models/logger');

var dateData = {};
var scrapping = {};
var periodicScheduler;
var oneTimeScrap = {};
var periodicSchedulerFirstTime;
var isScrapped;
// =============================================================================
// GET FOR ADMIN LOGIN ---------------------------------------------------------
// -----------------------------------------------------------------------------

AdminCtl.getLogin = function(req, res){
  res.render('admin/login');
};

// =============================================================================
// =============================================================================
// POST FOR ADMIN LOGIN --------------------------------------------------------
// -----------------------------------------------------------------------------

AdminCtl.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/adminLogin');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/adminLogin');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      if(user.mata.isAdmin){
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect('/adminHome');
      }
      else {
        req.flash('success', { msg: 'Failed! Wrong email or password.' });
        return res.redirect('/adminLogin');
      }
    });
  })(req, res, next);
};

// =============================================================================

AdminCtl.adminHome = function(req, res) {
  Scheduler.find({}, {},function(err, data) {
    if(err) console.log(err);
    console.log(data);
    console.log('current inprocees ' + scrapping.inprocess);
    if(data[0] !== undefined) {
      res.render('admin/dashboard', {
        scrapTime: data[0].scrapTime,
        inprocess: scrapping.inprocess
      });  
    }
    else {
      res.render('admin/dashboard', {
        inprocess: scrapping.inprocess
      });  
    }
  })  
};


// =============================================================================
//  Scheduler for scrapper
// =============================================================================

AdminCtl.scheduler = function(req, res) {
  var time = req.param('time'),
    now = (new Date()).getHours()*60*60*1000 + (new Date()).getMinutes()*60*1000;
  var scheduleAt = time.slice(0,2)*60*60*1000 + time.slice(3,5)*60*1000;
  var scrapAfter = scheduleAt - now;
  console.log('nowHours ' + (new Date()).getHours() + '  AtHours' +  time.slice(0,2)  );
  console.log('now ' + now + '  At' +  scheduleAt  +' scrapAfter'  + scrapAfter);
  if(scrapAfter > 0) {
    scrapAfter = scrapAfter;
    console.log('positive');
  }
  else {
    scrapAfter = (24*60*60*1000) + scrapAfter;
    console.log('negative');
  }
  console.log( time   + " " + 'scrapAfter' + scrapAfter);
  
  var scheduler = new Scheduler({
    scrapTime: time
  })
 
  if(time == '') {
    req.flash('please enter time');
    console.log('empty fields');
    res.redirect('/adminHome');
  }
  else {
    Scheduler.find({}, {}, function(err, find) {
      if(err) console.log(err);
      if(find.length != 0) {
        Scheduler.update({'_id': find[0]._id}, {$set: {scrapTime: time}}, function(err, success) {
          if (err) console.log(err);
          console.log('success' + success);
          if(success) {
            console.log('scrapper criteria successfully updated');
            clearInterval(periodicScheduler);
            setTimeout(function(){
              console.log('scrapping setTimeout');
              scrapping.inprocess = true;
              console.log('scrapping in process');
              CommonFunc.updateAllCases(function(data) {
                isScrapped = {
                  date: new Date(),
                  isScrapped: true
                }
                Scheduler.update({'_id': find[0]._id}, {$push: {'isScrapped': isScrapped}}, function(err, success) {
                  if(err) console.log(err);
                  console.log('scrapper setTimeout callback recieved');
                  console.log('scrapping Result ' + data);
                  scrapping.inprocess = false;
                  console.log('scrapping done');
                });
              });
              periodicScheduler = setInterval(function() {
                scrapping.inprocess = true;
                console.log('scrapping setInterval');
                CommonFunc.updateAllCases(function(data) { 
                  console.log('scrapper setInterval callback recieved');
                  isScrapped = {
                    date: new Date(),
                    isScrapped: true
                  }
                  Scheduler.update({'_id': find[0]._id}, {$push: {'isScrapped': isScrapped}}, function(err, success) {
                    if(err) console.log(err);
                    console.log('scrapper setInterval callback recieved');
                    console.log('scrapping Result ' + data);
                    scrapping.inprocess = false;
                    console.log('scrapping done');
                  });
                });
              }, 24*60*60*1000);
            }, scrapAfter);
            res.redirect('/adminHome');
          }
        })
      }
      else {
        scheduler.save(function(err, find) {
          if(err) console.log(err);
          console.log('successfully saved ' + find);
          clearInterval(periodicSchedulerFirstTime);
          setTimeout(function(){
            console.log('scrapping setTimeout');
            scrapping.inprocess = true;
            console.log('scrapping in process');
            CommonFunc.updateAllCases(function(data) {
              console.log('scrapper setTimeout callback recieved');
              console.log('scrapping Result ' + data);
              scrapping.inprocess = false;
              isScrapped = {
                date: new Date(),
                isScrapped: true
              }
              Scheduler.update({'_id': find._id}, {$push: {'isScrapped': isScrapped}}, function(err, success) {
                if(err) console.log(err);
                console.log('scrapping done');
              });
            });
            
            periodicSchedulerFirstTime = setInterval(function() {
              console.log('scrapping after' + scrapAfter);
              CommonFunc.updateAllCases(function(data) { 
                console.log('scrapper setInterval callback recieved');
                console.log(data);
                scrapping.inprocess = false;
                console.log('scrapping done');
              });
            }, 24*60*60*1000);
          }, scrapAfter);
            
          res.redirect('/adminHome');
        })
      }
    })  
  }  
}

// =============================================================================
// Scrap every court right now
// =============================================================================

AdminCtl.scrapNow = function(req, res) {
  var courtName = req.param('courtname');
  console.log('courtName' + courtName);
  console.log('inprocess change from ' + scrapping.inprocess);
  scrapping.inprocess = true;
  console.log('to ' + true);
  console.log('scrapping inprocess ' + scrapping.inprocess)
  CommonFunc.scrapIndividual(courtName, function(completed) {
    console.log('callback recieved after scrapping court')
    console.log('inprocess change from ' + scrapping.inprocess);
    scrapping.inprocess = false;
    console.log('to ' + false);
    console.log('scrapping inprocess ' + completed.inprocess);
  })
  res.redirect('adminHome');
}

// =============================================================================
// Find all scrappers log
// =============================================================================

AdminCtl.scrapperLog = function(req, res) {
  Logger.find({}, {}, function(err, logs) {
    if(err) console.log(err);
    console.log(scrapping.inprocess);
    var date = [];
    for(var i = 0; i < logs.length; i++ ) {
      date.push(logs[i].day.getDate()+'/'+logs[i].day.getMonth()+'/'+logs[i].day.getFullYear());
    }
    res.render('admin/scrap_fail_log', {
      allLogs: logs,
      dates: date
    });
  })
}

// =============================================================================
// Find Scrapper log by date
// =============================================================================

AdminCtl.scrapperLogByDate = function(req, res) {
  Logger.find({}, {}, function(err, logs) {
    if(err) console.log(err);
    var date = new Date(req.param('logdate'));
    var allCases  = [];
    var allDates = [];
    if(logs.length != 0) {
      console.log(date.getDate() + '/'+date.getMonth() + " " + (logs[0].day).getDate() +'/' + (logs[0].day).getMonth());
      for(var i = 0; i < logs.length; i++ ) {
        if((logs[i].day).getDate() === date.getDate() && (logs[i].day).getMonth() === date.getMonth() ) {
          console.log('compare');
          allDates.push(logs[i].day.getDate()+'/'+logs[i].day.getMonth()+'/'+logs[i].day.getFullYear());
          allCases.push(logs[i]);
        }
      }  

      Scheduler.find({}, {}, function(err, dateCheck) {
        if(err) console.log(err);
        console.log('dateCheck ' + dateCheck[0].isScrapped);
        res.render('admin/scrap_fail_log', {
          allLogs: allCases,
          dates: allDates
        });
      })
      
    }    
    else {
      res.render('admin/scrap_fail_log', {
        allLogs: allCases,
        dates: allDates
      });
    }
  })
}
