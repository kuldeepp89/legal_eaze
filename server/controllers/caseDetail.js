'use strict';


var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var UserCaseDetail = require('../models/userCaseDetail');
var CaseDetail  = require('../models/caseDetail');
var config = require('../config')("");
var commonFunc = require('./commonFunc');
var DetailCtl = module.exports;
var mkdirp = require('mkdirp');
var fs = require('fs');
var moment = require('moment');

// ===================================================================================================================
// Get Personal Cause List -----------------------------------------------------
// -----------------------------------------------------------------------------

DetailCtl.getPersonalCauseList = function(req, res) {
  var today = new Date();
  today.setDate(today.getDate()-1);
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  console.log(today);
  console.log(tomorrow);
  UserCaseDetail.find({'email': req.user.local.email}, {}, function(err, allCases) {
    if(err) console.log(err);
    console.log('allCases ' + allCases);
    var allRecentCases = [];
    for(var i = 0; i< allCases.length; i ++) {
      if(allCases[i].meeting !== undefined) {
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ki meeting');
            allRecentCases.push(allCases[i]);
          }  
        }
      }  
      else if(allCases[i].delhiHighCourt !== undefined) {
        var scrapper = allCases[i].delhiHighCourt.scrapperHearingDate[allCases[i].delhiHighCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('delhiHighCourt scrapperHearingDate ' + scrapper);
        console.log("delhiHighCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case delhiHighCourt with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case delhiHighCourt');
          allRecentCases.push(allCases[i]);
        } 
      }
      else if(allCases[i].supremeCourt !== undefined) {
        var scrapper = allCases[i].supremeCourt.scrapperHearingDate[allCases[i].supremeCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('supremeCourt scrapperHearingDate ' + scrapper);
        console.log("supremeCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case supremeCourt with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case supremeCourt');
          allRecentCases.push(allCases[i]);
        } 
      }  
      else if(allCases[i].delhiHighCourt !== undefined) {
        var scrapper = allCases[i].delhiHighCourt.scrapperHearingDate[allCases[i].delhiHighCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('delhiHighCourt scrapperHearingDate ' + scrapper);
        console.log("delhiHighCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;   
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case delhiHighCourt with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case delhiHighCourt');
          allRecentCases.push(allCases[i]);
        } 
      }
      
      else  if(allCases[i].greenTribunal !== undefined) {
        var scrapper = allCases[i].greenTribunal.scrapperHearingDate[allCases[i].greenTribunal.scrapperHearingDate.length-1].hearingDate; 
        console.log('greenTribunal scrapperHearingDate ' + scrapper);
        console.log("greenTribunal userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case greenTribunal with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
          
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case greenTribunal');
          allRecentCases.push(allCases[i]);
        } 
      }
          
      else if(allCases[i].telecomDispute !== undefined) {
        var scrapper = allCases[i].telecomDispute.scrapperHearingDate[allCases[i].telecomDispute.scrapperHearingDate.length-1].hearingDate; 
        console.log('telecomDispute scrapperHearingDate ' + scrapper);
        console.log("telecomDispute userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case telecomDispute with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case telecomDispute');
          allRecentCases.push(allCases[i]);
        } 
      }
  
      else if(allCases[i].consumerDispute !== undefined) {
        var scrapper = allCases[i].consumerDispute.scrapperHearingDate[allCases[i].consumerDispute.scrapperHearingDate.length-1].hearingDate; 
        console.log('consumerDispute scrapperHearingDate ' + scrapper);
        console.log("consumerDispute userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case consumerDispute with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case consumerDispute');
          allRecentCases.push(allCases[i]);
        } 
      }
      else if(allCases[i].karkarDooma !== undefined) {
        var scrapper = allCases[i].karkarDooma.scrapperHearingDate[allCases[i].karkarDooma.scrapperHearingDate.length-1].hearingDate; 
        console.log('karkarDooma scrapperHearingDate ' + scrapper);
        console.log("karkarDooma userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;   
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case karkarDooma with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case karkarDooma');
          allRecentCases.push(allCases[i]);
        } 
      }
      else if(allCases[i].bifrCourt !== undefined) {
        var scrapper = allCases[i].bifrCourt.scrapperHearingDate[allCases[i].bifrCourt.scrapperHearingDate.length-1].hearingDate; 
        console.log('bifrCourt scrapperHearingDate ' + scrapper);
        console.log("bifrCourt userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
          
          if(new Date(user) >= today && new Date(user) <= tomorrow) {
            console.log('aaj ka case bifrCourt with userHearingDate');
            allRecentCases.push(allCases[i]);
          }  
          
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case bifrCourt');
          allRecentCases.push(allCases[i]);
        } 
      } 

      else if(allCases[i].saket !== undefined) {
        var scrapper = allCases[i].saket.scrapperHearingDate[allCases[i].saket.scrapperHearingDate.length-1].hearingDate; 
        console.log('saket scrapperHearingDate ' + scrapper);
        console.log("saket userHearingDate " + allCases[i].userHearingDate.length);
        if(allCases[i].userHearingDate.length != 0) {
          var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
         
            if(new Date(user) >= today && new Date(user) <= tomorrow) {
              console.log('aaj ka case saket with userHearingDate');
              allRecentCases.push(allCases[i]);
            }  
         
        }
        else  if(new Date(scrapper) >= today && new Date(scrapper) <= tomorrow) {
          console.log('aaj ka case saket');
          allRecentCases.push(allCases[i]);
        } 
      }    
    }
    console.log(allRecentCases + "all cases");
    res.render('homePage', {
      allCases: allRecentCases
    })
  })
}

// ===================================================================================================================
//Get cases between two dates---------------------------------------------------
//------------------------------------------------------------------------------

DetailCtl.getFilterCases = function(req, res) {
  var sdate = new Date(req.body.sdate),
      edate = new Date(req.body.edate);
  console.log(sdate);
  console.log(edate);
  if(sdate === 'Invalid Date') {

  }
  else if(edate === 'Invalid Date') {

  }
  else {
    UserCaseDetail.find({'email': req.user.local.email}, {}, function(err, allCases) {
      if(err) console.log(err);
      console.log('allCases ' + allCases);
      var filteredCases = [];
      for(var i = 0; i< allCases.length; i ++) {
        if(allCases[i].meeting !== undefined) {
          if(allCases[i].userHearingDate.length != 0) {
            var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ki meeting');
              filteredCases.push(allCases[i]);
            }  
          }
        }  
        else if(allCases[i].delhiHighCourt !== undefined) {
          var scrapper = allCases[i].delhiHighCourt.scrapperHearingDate[allCases[i].delhiHighCourt.scrapperHearingDate.length-1].hearingDate; 
          console.log('delhiHighCourt scrapperHearingDate ' + scrapper);
          console.log("delhiHighCourt userHearingDate " + allCases[i].userHearingDate.length);
          if(allCases[i].userHearingDate.length != 0) {
            var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
           
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case delhiHighCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
           
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
            console.log('aaj ka case delhiHighCourt');
            filteredCases.push(allCases[i]);
          } 
        }
        else if(allCases[i].supremeCourt !== undefined) {
          var scrapper = allCases[i].supremeCourt.scrapperHearingDate[allCases[i].supremeCourt.scrapperHearingDate.length-1].hearingDate; 
          console.log('supremeCourt scrapperHearingDate ' + scrapper);
          console.log("supremeCourt userHearingDate " + allCases[i].userHearingDate.length);
          if(allCases[i].userHearingDate.length != 0) {
            var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
            
              if(new Date(user) >= sdate && new Date(user) <= edate) {
                console.log('aaj ka case supremeCourt with userHearingDate');
                filteredCases.push(allCases[i]);
              }  
  
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
           
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case delhiHighCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
           
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
            
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case greenTribunal with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
            
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
            
              if(new Date(user) >= sdate && new Date(user) <= edate) {
                console.log('aaj ka case telecomDispute with userHearingDate');
                filteredCases.push(allCases[i]);
              }  
            
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
            
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case consumerDispute with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
            
          }
          else if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
            console.log('aaj ka case consumerDispute');
            filteredCases.push(allCases[i]);
          } 
        }
        
        else if(allCases[i].karkarDooma !== undefined) {
          var scrapper = allCases[i].karkarDooma.scrapperHearingDate[allCases[i].karkarDooma.scrapperHearingDate.length-1].hearingDate; 
          console.log('karkarDooma scrapperHearingDate ' + scrapper);
          console.log("karkarDooma userHearingDate " + allCases[i].userHearingDate.length);
          if(allCases[i].userHearingDate.length != 0) {
            var user = allCases[i].userHearingDate[allCases[i].userHearingDate.length-1].hearingDate;
            
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case karkarDooma with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
           
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
            
            if(new Date(user) >= sdate && new Date(user) <= edate) {
              console.log('aaj ka case bifrCourt with userHearingDate');
              filteredCases.push(allCases[i]);
            }  
            
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
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
           
              if(new Date(user) >= sdate && new Date(user) <= edate) {
                console.log('aaj ka case saket with userHearingDate');
                filteredCases.push(allCases[i]);
              }  
           
          }
          else  if(new Date(scrapper) >= sdate && new Date(scrapper) <= edate) {
            console.log('aaj ka case saket');
            filteredCases.push(allCases[i]);
          } 
        }    
      }
      console.log('filteredCases ' + filteredCases);
      res.render('homePage', {
        allCases: filteredCases,
        sdate: sdate,
        edate: edate
      })
    });
  }
 
}
//------------------------------------------------------------------------------
//Get case details of case------------------------------------------------------
// -----------------------------------------------------------------------------

DetailCtl.getCaseDetail = function(req, res) {
  var id = req.param('id');
  UserCaseDetail.find({'_id': id}, {}, function (err, add) {
    if(err) console.log(err);
    console.log(add);
    var type1 = [];
    var type2 = [];
    var type3 = [];
    var name1 = [], name2= [], name3 = []; 
    for(var i = 0; i< add[0].documents.length ; i++) {
      var type = add[0].documents[i].docType;
      if(type === 'Type1') {
        
        type1.push(add[0].documents[i].path.slice(1));
        
      }  
    }
    for(var i = 0; i< add[0].documents.length ; i++) {
       var type = add[0].documents[i].docType;
      if(type === 'Type2') {
        type2.push(add[0].documents[i].path.slice(1));
        
      }
    }
    for(var i = 0; i< add[0].documents.length ; i++) {
       var type = add[0].documents[i].docType;
      if(type === 'Type3') {
        type3.push(add[0].documents[i].path.slice(1));
        
      } 
    } 

    console.log(type1, type2, type3);
    
    return res.render('detailPage', {
      userCaseDetail: add,
      type1: type1,
      type2: type2,
      type3: type3, 
      name1: name1,
      name2: name2,
      name3: name3,
      userName: req.user.profile.name
    })
  })  
}


//------------------------------------------------------------------------------
//Edit Hearing Date-------------------------------------------------------------
// -----------------------------------------------------------------------------

DetailCtl.getEditHearingDate = function(req, res) {
   var ndate  = new Date(req.param('ndate')),
    id = req.param('id');
    console.log("ndate===="+ndate);
    console.log("home page =="+ req.param('homepage'));
    console.log("id =="+ id);
    var userHearingDate = {
      hearingDate: ndate,
      cAt: new Date()
    }
  UserCaseDetail.update({'_id': id},  {$push: {'userHearingDate': userHearingDate}}, function(err, success) {
    if(err) console.log("Error of updating::"+err);
    console.log("successfull updation::"+success);
    if(req.param('homepage') === 'true'){
      res.redirect('/home');
    }
    else{
      res.redirect('/CaseDetail/' + id); 
    }
  })
}

