'use strict';


var _ = require('lodash');
var AddMatterCtl = module.exports;
var request = require('request');
var cheerio = require('cheerio');
var UserCaseDetail = require('../models/userCaseDetail');
var CaseDetail = require('../models/caseDetail');
var User = require('../models/user');
var fs      = require('fs');
var mkdirp = require('mkdirp');
var Scrap = require('../utils/scrapper');
var flag = {};
var key;
var courtCaseDetail;
var moment = require('moment');
var consumerD;
var ids = [];

AddMatterCtl.postAddMatter = function(req, res){
  var court = req.body.courtName,
    caseNumber = req.body.caseNumber,
    caseType = req.body.caseType,
    courtType = req.body.courtType,
    caseDate = req.body.caseDate,
    caseYear  = req.body.caseYear,
    userType = req.body.userType,
    stateCode =  req.body.stateCode,
    stateCode_D = req.body.stateCode_D,
    distCode = req.body.distCode,
    caseIdNumber = req.body.caseId;
  
  if(court === 'Company Law Board') {
    key = court + '__' + courtType + '__' + caseDate;
  }
  else if (court === 'National Consumer Disputes') {
    key = court + '__' + userType + '__' + caseNumber.split('/').join('__');
  }
  else {
    key = court + '__' + caseNumber+ '__' + caseYear;     
  }
  
  console.log("key" + key);
  flag[key] = {};

  if(req.user.mata.isPremium === false && req.user.noMatter>=100 ) {
    console.log('please buy premium membership');
    return res.json({
        'key': key,
        'message': {
          'error': 'not premium' 
        }
      }
    );
  }    
      
  flag[key].inprocess = true;
  switch (court) {
    case "Supreme Court of India":
      CaseDetail.find({'supremeCourt.caseNumber': caseNumber, 'supremeCourt.caseYear': caseYear}, {}, function(err, caseFoundSupremeCourt){
        if(err) console.log(err);
        console.log('cases' + caseFoundSupremeCourt);
        
        if(caseFoundSupremeCourt != undefined && caseFoundSupremeCourt[0] != undefined) {
          for(var i = 0; i <= caseFoundSupremeCourt.length-1; i++  ) {
            for(var j = 0; j <= caseFoundSupremeCourt[i].users.length-1; j++  ) {
              ids.push(caseFoundSupremeCourt[i].users[j]);
            }
          }
          console.log(ids);
          UserCaseDetail.find({'_id': {$in: ids}, 'email': req.user.local.email} , {}, function(err, emailFound) {
            if(err) console.log(err);
            ids.splice(0, ids.length);
            console.log('case' + emailFound);
            ////console.log('already added' + emailFound[0].email + req.user.local.email);
            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case',
                    'url': 'caseDetail'+'/'+ emailFound[0]._id

                  }
                })  
              }  
            }
            
            else {
              console.log('not added add now');
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundSupremeCourt[0].supremeCourt.caseNumber,
                    'caseYear': caseFoundSupremeCourt[0].supremeCourt.caseYear,
                    'courtName': 'Supreme Court of India',
                    'caseDate': caseFoundSupremeCourt[0].supremeCourt.scrapperHearingDate[caseFoundSupremeCourt[0].supremeCourt.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundSupremeCourt[0].supremeCourt.caseBrief,
                    'latestOrder': caseFoundSupremeCourt[0].supremeCourt.caseOrderDates[caseFoundSupremeCourt[0].supremeCourt.caseOrderDates.length-1],
                    'caseStatus': caseFoundSupremeCourt[0].supremeCourt.caseStatus
                  }
                }            
              });

            }
            
          })
        
          
        }
        else {
          Scrap.supremeCourt(req.body.caseType, req.body.caseNumber, req.body.caseYear, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        } 
      })     
    break; //Supreme Court ---------------

    case "Delhi High Court":
      CaseDetail.find({'delhiHighCourt.caseNumber': caseNumber, 'delhiHighCourt.caseYear': caseYear}, {}, function(err, caseFoundDelhiHighCourt){
        if(err) console.log(err);
        console.log('cases' + caseFoundDelhiHighCourt);
        if(caseFoundDelhiHighCourt != undefined && caseFoundDelhiHighCourt[0] != undefined) {
          flag[key].id = caseFoundDelhiHighCourt[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'delhiHighCourt.caseNumber': caseNumber, 'delhiHighCourt.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundDelhiHighCourt[0].delhiHighCourt.caseNumber,
                    'caseYear': caseFoundDelhiHighCourt[0].delhiHighCourt.caseYear,
                    'courtName': 'Delhi High Court',
                    'caseDate': caseFoundDelhiHighCourt[0].delhiHighCourt.scrapperHearingDate[caseFoundDelhiHighCourt[0].delhiHighCourt.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundDelhiHighCourt[0].delhiHighCourt.caseBrief,
                    'latestOrder': caseFoundDelhiHighCourt[0].delhiHighCourt.caseOrderDates[caseFoundDelhiHighCourt[0].delhiHighCourt.caseOrderDates.length-1],
                    'caseStatus': caseFoundDelhiHighCourt[0].delhiHighCourt.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.delhiHighCourt(req.body.caseType, req.body.caseNumber, req.body.caseYear, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          }); 
          return res.json({'key': key});  
        }
      }); 
    break;//Delhi High Court

    case "National Green Tribunal":
      CaseDetail.find({'greenTribunal.caseNumber': caseNumber, 'greenTribunal.caseYear': caseYear}, {}, function(err, caseFoundGreenTribunal){
        if(err) console.log(err);
        console.log('cases' + caseFoundGreenTribunal);
        if(caseFoundGreenTribunal != undefined && caseFoundGreenTribunal[0] != undefined) {
          flag[key].id = caseFoundGreenTribunal[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'greenTribunal.caseNumber': caseNumber, 'greenTribunal.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundGreenTribunal[0].greenTribunal.caseNumber,
                    'caseYear': caseFoundGreenTribunal[0].greenTribunal.caseYear,
                    'courtName': 'National Green Tribunal',
                    'caseDate': caseFoundGreenTribunal[0].greenTribunal.scrapperHearingDate[caseFoundGreenTribunal[0].greenTribunal.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundGreenTribunal[0].greenTribunal.caseBrief,
                    'latestOrder': caseFoundGreenTribunal[0].greenTribunal.caseOrderDates[caseFoundGreenTribunal[0].greenTribunal.caseOrderDates.length-1],
                    'caseStatus': caseFoundGreenTribunal[0].greenTribunal.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.greenTribunal(req.body.caseType, req.body.caseNumber, req.body.caseYear, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }    
      })
    break;//GreenTribunal End
    
    case "Telecom Disputes":
      CaseDetail.find({'telecomDispute.caseNumber': caseNumber, 'telecomDispute.caseYear': caseYear}, {}, function(err, caseFoundTelecomDispute){
        if(err) console.log(err);
        console.log('cases' + caseFoundTelecomDispute);
        if(caseFoundTelecomDispute != undefined && caseFoundTelecomDispute[0] != undefined) {
          flag[key].id = caseFoundTelecomDispute[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'telecomDispute.caseNumber': caseNumber, 'telecomDispute.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundTelecomDispute[0].telecomDispute.caseNumber,
                    'caseYear': caseFoundTelecomDispute[0].telecomDispute.caseYear,
                    'courtName': 'Telecom Disputes',
                    'caseDate': caseFoundTelecomDispute[0].telecomDispute.scrapperHearingDate[caseFoundTelecomDispute[0].telecomDispute.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundTelecomDispute[0].telecomDispute.caseBrief,
                    'latestOrder': caseFoundTelecomDispute[0].telecomDispute.caseOrderDates[caseFoundTelecomDispute[0].telecomDispute.caseOrderDates.length-1],
                    'caseStatus': caseFoundTelecomDispute[0].telecomDispute.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.telecomDispute(req.body.caseType, req.body.caseNumber, req.body.caseYear, req.body.caseDate, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
        
      })
    break;// Telecom Dispute End
    
    case "National Consumer Disputes":
      CaseDetail.find({'consumerDispute.caseNumber': caseNumber, 'consumerDisputes.caseYear': caseYear}, {}, function(err, caseFoundConsumerDisputes){
        if(err) console.log(err);
        console.log('cases' + caseFoundConsumerDisputes);
        if(caseFoundConsumerDisputes != undefined && caseFoundConsumerDisputes[0] != undefined) {
          flag[key].id = caseFoundConsumerDisputes[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'consumerDispute.caseNumber': caseNumber, 'consumerDispute.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundConsumerDisputes[0].consumerDispute.caseNumber,
                    'caseYear': caseFoundConsumerDisputes[0].consumerDispute.caseYear,
                    'courtName': 'National Consumer Disputes',
                    'caseDate': caseFoundConsumerDisputes[0].consumerDispute.scrapperHearingDate[caseFoundConsumerDisputes[0].consumerDispute.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundConsumerDisputes[0].consumerDispute.caseBrief,
                    'latestOrder': caseFoundConsumerDisputes[0].consumerDispute.caseOrderDates[caseFoundConsumerDisputes[0].consumerDispute.caseOrderDates.length-1],
                    'caseStatus': caseFoundConsumerDisputes[0].consumerDispute.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          console.log('type' + req.body.userType + 'number' + req.body.caseNumber + 'stateCode'+  req.body.stateCode + 'stateCode_D' + req.body.stateCode_D + 'distCode' + req.body.distCode);
          Scrap.consumerDispute(req.body.userType, req.body.caseNumber, req.body.stateCode, req.body.stateCode_D, req.body.distCode, function(data){
            console.log('Data aa gaya' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
            console.log(flag[key]);
          });
          console.log('key' + key);
          return res.json({'key': key});  
        }    
      })
    break;// Consumer Dispute End

    case "Competition Appellate Tribunal":
      CaseDetail.find({'competitionAppellateTribunal.caseNumber': caseNumber, 'competitionAppellateTribunal.caseYear': caseYear}, {}, function(err, caseFoundCompetetion){
        if(err) console.log(err);
        console.log('cases' + caseFoundCompetetion);
        if(caseFoundCompetetion != undefined && caseFoundCompetetion[0] != undefined) {
          flag[key].id = caseFoundCompetetion[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'competitionAppellateTribunal.caseNumber': caseNumber, 'competitionAppellateTribunal.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundCompetetion[0].competitionAppellateTribunal.caseNumber,
                    'caseYear': caseFoundCompetetion[0].competitionAppellateTribunal.caseYear,
                    'courtName': 'Competition Appellate Tribunal',
                    'caseDate': caseFoundCompetetion[0].competitionAppellateTribunal.scrapperHearingDate[caseFoundCompetetion[0].competitionAppellateTribunal.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundCompetetion[0].competitionAppellateTribunal.caseBrief,
                    'latestOrder': caseFoundCompetetion[0].competitionAppellateTribunal.caseOrderDates[caseFoundCompetetion[0].competitionAppellateTribunal.caseOrderDates.length-1],
                    'caseStatus': caseFoundCompetetion[0].competitionAppellateTribunal.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.competitionAppellateTribunal(req.body.caseType, req.body.caseNumber, req.body.caseYear, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
        
      })
    break; //competitionAppellateTribunal End

    case "Company Law Board":
      CaseDetail.find({'companyLawBoard.courtNumber': courtType, 'companyLawBoard.caseDate': caseDate}, {}, function(err, caseFoundCompanyLawBoard){
        if(err) console.log(err);
        console.log('cases' + caseFoundCompanyLawBoard);
        if(caseFoundCompanyLawBoard != undefined && caseFoundCompanyLawBoard[0] != undefined) {
          flag[key].id = caseFoundCompanyLawBoard[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'companyLawBoard.caseNumber': caseNumber, 'companyLawBoard.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundCompanyLawBoard[0].companyLawBoard.caseNumber,
                    'caseYear': caseFoundCompanyLawBoard[0].companyLawBoard.caseYear,
                    'courtName': 'Company Law Board',
                    'caseDate': caseFoundCompanyLawBoard[0].companyLawBoard.scrapperHearingDate[caseFoundCompanyLawBoard[0].companyLawBoard.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundCompanyLawBoard[0].companyLawBoard.caseBrief,
                    'latestOrder': caseFoundCompanyLawBoard[0].companyLawBoard.caseOrderDates[caseFoundCompanyLawBoard[0].companyLawBoard.caseOrderDates.length-1],
                    'caseStatus': caseFoundCompanyLawBoard[0].companyLawBoard.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.companyLawBoard(req.body.courtType, req.body.caseDate, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
        
      })
    break;//companyLawBoard End

    case "Board for Industrial & Financial Reconstruction":
      CaseDetail.find({'bifrCourt.caseNumber': caseNumber, 'bifrCourt.caseDate': caseDate}, {}, function(err, caseFoundBifr){
        if(err) console.log(err);
        console.log('cases' + caseFoundBifr);
        if(caseFoundBifr != undefined && caseFoundBifr[0] != undefined) {
          flag[key].id = caseFoundBifr[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'bifrCourt.caseNumber': caseNumber, 'bifrCourt.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundBifr[0].bifrCourt.caseNumber,
                    'caseYear': caseFoundBifr[0].bifrCourt.caseYear,
                    'courtName': 'Board for Industrial & Financial Reconstruction',
                    'caseDate': caseFoundBifr[0].bifrCourt.scrapperHearingDate[caseFoundBifr[0].bifrCourt.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundBifr[0].bifrCourt.caseBrief,
                    'latestOrder': caseFoundBifr[0].bifrCourt.caseOrderDates[caseFoundBifr[0].bifrCourt.caseOrderDates.length-1],
                    'caseStatus': caseFoundBifr[0].bifrCourt.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.boardOfFinance(req.body.caseYear, req.body.caseNumber, function(data){
            console.log('Data' + " " + data);
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
      })
    break;//boardOfFinance End

    case "District Court Karkardooma":
      console.log('mila');
      CaseDetail.find({'karkarDooma.caseNumber': caseNumber, 'karkarDooma.caseDate': caseDate, 'karkarDooma.caseIdNumber': caseIdNumber}, {}, function(err, caseFoundKK){
        if(err) console.log(err);
        console.log('cases' + caseFoundKK);
        if(caseFoundKK != undefined && caseFoundKK[0] != undefined) {
          flag[key].id = caseFoundKK[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'karkarDooma.caseNumber': caseNumber, 'karkarDooma.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundKK[0].karkarDooma.caseNumber,
                    'caseYear': caseFoundKK[0].karkarDooma.caseYear,
                    'courtName': 'District Court Karkardooma',
                    'caseDate': caseFoundKK[0].karkarDooma.scrapperHearingDate[caseFoundKK[0].karkarDooma.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundKK[0].karkarDooma.caseBrief,
                    'latestOrder': caseFoundKK[0].karkarDooma.caseOrderDates[caseFoundKK[0].karkarDooma.caseOrderDates.length-1],
                    'caseStatus': caseFoundKK[0].karkarDooma.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.karkarDooma(req.body.caseType, req.body.caseNumber, req.body.caseYear, req.body.caseId, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
      })
    break;//karkardooma End

    case "District Court Saket":
      CaseDetail.find({'saket.caseNumber': caseNumber, 'saket.caseDate': caseDate, 'saket.caseIdNumber': caseIdNumber}, {}, function(err, caseFoundSaket){
        if(err) console.log(err);
        console.log('cases' + caseFoundSaket);
        if(caseFoundSaket != undefined && caseFoundSaket[0] != undefined) {
          flag[key].id = caseFoundSaket[0]._id;
          console.log('id' + flag[key].id);
          UserCaseDetail.find({'saket.caseNumber': caseNumber, 'saket.caseYear': caseYear} , {}, function(err, emailFound) {
            if(err) console.log(err);
            //console.log('already added' + emailFound[0] + emailFound[0].email + req.user.local.email);

            if(emailFound[0] != undefined) {
              if(emailFound[0].email === req.user.local.email) {
                return res.json({
                  'key': key,
                  'message': {
                    'failed': 'you have already added this case'
                  }
                })  
              }  
            }
            else {
              return res.json({
                'key': key,
                'message': {
                  'success': 'success',
                  'data': {
                    'caseNumber': caseFoundSaket[0].saket.caseNumber,
                    'caseYear': caseFoundSaket[0].saket.caseYear,
                    'courtName': 'District Court Saket',
                    'caseDate': caseFoundSaket[0].saket.scrapperHearingDate[caseFoundSaket[0].saket.scrapperHearingDate.length-1].hearingDate,
                    'caseBrief': caseFoundSaket[0].saket.caseBrief,
                    'latestOrder': caseFoundSaket[0].saket.caseOrderDates[caseFoundSaket[0].saket.caseOrderDates.length-1],
                    'caseStatus': caseFoundSaket[0].saket.caseStatus
                  }
                }
                               
              })
            }
          });
        }
        else {
          Scrap.saket(req.body.caseType, req.body.caseNumber, req.body.caseYear, req.body.caseId, function(data){
            console.log('Data' + " " + data)
            flag[key].inprocess = false;
            flag[key].data = data;
          });
          return res.json({'key': key});  
        }
      })
    break;//Saket End

    default:          
  }              
};

//------------------------------------------------------------------
//Requset for case enquiry with a token by user.....................
//------------------------------------------------------------------

AddMatterCtl.getEnquireMatter = function(req, res){
  var key = flag[req.param('key')],
   all = req.param('key').split('__'),
   courtName = all[0],
   caseNumber = all[1],
   caseTime = all[2];
   console.log(key + " " + courtName + " " + caseNumber);
  if(flag[req.param('key')] === undefined) {
    return res.json({'message': 
      {'error': "invalid key"}
    })
  } 

  else if(flag[req.param('key')].inprocess) {
    return res.json({'message': 
      {'success': "your request is in process"}
    });
  }

  else if(!flag[req.param('key')].inprocess) {
    console.log('data scrapped' + key.data);
    return res.json({'message': 
      {'success': "done",
        'data':  key.data}
    });
  }
};


//----------------------------------------------------------
//Sumbmit matter after confirmed by user--------------------
//----------------------------------------------------------

AddMatterCtl.postSubmitMatter = function(req, res) {
  var scrapper = {
    hearingDate: new Date(req.body.hearingDate),
    cAt: new Date()
  }
  console.log('hearingDate' + new Date(req.body.hearingDate));
  console.log('caseBrief' + req.body.caseBrief);
  console.log('caseOrderDates' + new Date(req.body.orderDate));

  courtCaseDetail = {
    scrapperHearingDate: [scrapper],
    caseType: req.body.caseType,
    caseNumber: req.body.caseNumber,
    caseYear: req.body.caseYear,
    caseStatus: req.body.caseStatus,
    caseBrief: req.body.caseBrief,
    caseOrderDates: [new Date(req.body.orderDate)],
    lastUpdated: new Date()
  }
  if(req.body.courtName === 'Supreme Court of India') {
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      supremeCourt: courtCaseDetail
    })  
  }
  else if(req.body.courtName === 'Delhi High Court') {
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      delhiHighCourt: courtCaseDetail
    })  
  }
  else if(req.body.courtName === 'National Green Tribunal') {
    console.log('green');
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      greenTribunal: courtCaseDetail
    })
  }
  else if(req.body.courtName === 'Telecom Disputes') {
    console.log('Telecom');
    var telecomDisputeCaseDetail = {
      scrapperHearingDate: [scrapper],
      caseType: req.body.caseType,
      caseNumber: req.body.caseNumber,
      caseYear: req.body.caseYear,
      caseStatus: req.body.caseStatus,
      caseBrief: req.body.caseBrief,
      caseOrderDates: [new Date(req.body.orderDate)],
      caseDate: req.body.caseDate,
      lastUpdated: new Date()
    }
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      telecomDispute: telecomDisputeCaseDetail
    })
  }
  else if(req.body.courtName === 'Company Law Board') {
    console.log('Telecom');
    var companyLawBoard = {
      courtType: req.body.courtType,
      caseLink: req.body.caseLink,
      caseDate: req.body.caseDate,
      lastUpdated: new Date()
    }
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      companyLawBoard: companyLawBoard
     
    })
  }
  else if(req.body.courtName === 'National Consumer Disputes') {
    console.log('Consumer');
    consumerD = {
      scrapperHearingDate: [scrapper],
      caseBrief: req.body.caseBrief,
      caseOrderDates: [new Date(req.body.orderDate)],
      caseNumber: req.body.caseNumber,
      lastUpdated: new Date()
    }
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      consumerDispute: consumerD
     
    })
  }
  else if(req.body.courtName === 'Board for Industrial & Financial Reconstruction') {
    console.log('bifr');
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      bifrCourt: courtCaseDetail
     
    })
  }
  else if(req.body.courtName === 'District Court Karkardooma') {
    console.log('karkarDooma' + req.body.caseId);
    var karkarDoomaCourtDetail = {
      scrapperHearingDate: [scrapper],
      caseType: req.body.caseType,
      caseNumber: req.body.caseNumber,
      caseYear: req.body.caseYear,
      caseStatus: req.body.caseStatus,
      caseBrief: req.body.caseBrief,
      caseOrderDates: [new Date(req.body.orderDate)],
      caseIdNumber: req.body.caseId,
      lastUpdated: new Date()
    }
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      karkarDooma: karkarDoomaCourtDetail
     
    })
  }
  else if(req.body.courtName === 'District Court Saket') {
    console.log('saket ' + req.body.caseId);
    var saketCaseDetail = {
      scrapperHearingDate: [scrapper],
      caseType: req.body.caseType,
      caseNumber: req.body.caseNumber,
      caseYear: req.body.caseYear,
      caseStatus: req.body.caseStatus,
      caseBrief: req.body.caseBrief,
      caseOrderDates: [new Date(req.body.orderDate)],
      caseIdNumber: req.body.caseId,
      lastUpdated: new Date()
    }
    var userCaseDetail = new UserCaseDetail({
      email: req.user.local.email,
      saket: saketCaseDetail
     
    })
  }
  userCaseDetail.save(function(err, caseId) {
    if(err) console.log(err);
    User.update({'local.email': req.user.local.email}, {$inc: {noMatter: 1 }}, function(err, success) {
      if(err) console.log(err);
      console.log(caseId);
      
      if(req.body.courtName === 'Supreme Court of India') {
        console.log('yaha par aana chahiye tha' + flag[key].id);
        if(flag[key].id != undefined) {
          console.log('yaha par aana chahiye tha tabhi hoga' + flag[key].id);
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        }             
        else { 
          var caseDetail = new CaseDetail({
            supremeCourt: courtCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      } 
      else if(req.body.courtName === 'Delhi High Court') {
        if(flag[key].id != undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            delhiHighCourt: courtCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'National Green Tribunal') {
        if(flag[key].id != undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        }              
        else { 
          var caseDetail = new CaseDetail({
            greenTribunal: courtCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'Telecom Disputes') {
        if(flag[key].id != undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            telecomDispute: telecomDisputeCaseDetail,
            users: caseId._id
          })
          console.log('yaha par aaya' + caseDetail);
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'National Consumer Disputes') {
        if(flag[key].id !== undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            consumerDispute: consumerD,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'Competition Appellate Tribunal') {
        if(flag[key].id != undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
        else { 
          var caseDetail = new CaseDetail({
            competitionAppellateTribunal: courtCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName == 'Company Law Board') {
        if(flag[key].id != undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        }            
        else { 
          var caseDetail = new CaseDetail({
            companyLawBoard: companyLawBoard,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'Board for Industrial & Financial Reconstruction') {
        if(flag[key].id !== undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            bifrCourt: courtCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'District Court Karkardooma') {
        if(flag[key].id !== undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            karkarDooma: karkarDoomaCourtDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
      else if(req.body.courtName === 'District Court Saket') {
        if(flag[key].id !== undefined) {
          CaseDetail.update({'_id' : flag[key].id }, {$push: {'users': caseId._id}}, function(err, success) {
            if (err) {console.log(err)};
            console.log('updated');
            return res.redirect('/home');
          }) 
        } 
                     
        else { 
          var caseDetail = new CaseDetail({
            saket: saketCaseDetail,
            users: caseId._id
          })
          caseDetail.save(function(err) {
            if(err) console.log(err);
            return res.redirect('/home');
          })  
        }
      }
    })   
  })  
}


//----------------------------------------------------------
//Update case details---------------------------------------
//----------------------------------------------------------
AddMatterCtl.update = function(req, res) {
  var  id = req.body.userid,
  nextHearingDate = new Date(req.body.nextHearingDate),
  caseOrderDates = new Date(req.body.caseOrderDates),
  caseBrief = req.body.caseBrief;
  console.log(id);
  var scrapper = {
    hearingDate: nextHearingDate,
    cAt: new Date()
  }
  var supremeCourt = {
    scrapperHearingDate: [scrapper],
    caseOrderDates: [caseOrderDates],
    caseBrief: caseBrief
  }

  CaseDetail.find({'_id': id}, {users: 1}, function(err, document) {
    if (err) console.log(err);
    console.log(document);
    CaseDetail.update({'_id': id},{$push:{'supremeCourt.scrapperHearingDate': scrapper, 'supremeCourt.caseOrderDates': caseOrderDates}}, function(err, success) {
      if(err) console.log(err);
      res.send(success);
    }) 
    var i;
    for(i = 0; i <= document[0].users.length-1; i++ ){
      console.log(document[0].users[i]); 
      UserCaseDetail.update({'_id': document[0].users[i]},{$push:{'supremeCourt.scrapperHearingDate': scrapper, 'supremeCourt.caseOrderDates': caseOrderDates}}, function(err, success) {
        if(err) console.log(err);
        res.send(success);
      })
    }   
  })
}

//----------------------------------------------------------
//Add a meeting---------------------------------------------
//----------------------------------------------------------

AddMatterCtl.postAddMeeting = function(req, res) {
  var meetingDate = new Date(req.body.time),
    location = req.body.location,
    description = req.body.description;

  var meeting = {
    description: description,
    location: location,
    lastUpdated: new Date()
  }


  var userHearingDate = {
    cAt: new Date(),
    hearingDate: meetingDate
  }
  var userCaseDetail = new UserCaseDetail({
    email: req.user.local.email,
    userHearingDate: [userHearingDate],
    meeting: meeting,
    isManual: true
  })
  if(req.user.mata.isPremium === false && req.user.noMatter >= 100) {
    console.log('please buy premium membership');
    return res.redirect('/home');
  }
  else {
    userCaseDetail.save(function(err) {
      if(err) console.log(err);
      User.update({'local.email': req.user.local.email}, {$inc: {noMatter: 1 }}, function(err, success) {
        res.redirect('/home');
      })
          
    })
  } 
}

//----------------------------------------------------------
//Post a Comment--------------------------------------------
//----------------------------------------------------------

AddMatterCtl.postAddComment = function(req, res) {
  console.log("comment" + req.body.comment);
  console.log("id" + req.body.id);
  var id =  req.body.id;
  var comments = {
    comment: req.body.comment,
    cAt: new Date()
  }
  UserCaseDetail.find({'_id': id}, {}, function (err, cases) {
    if(err) console.log(err);
    console.log('cases' + cases);
    if(cases != undefined && cases.length != 0) {
      if(req.body.comment === '') {
        req.flash('errors', { msg: 'Please Enter Comment' });
        return res.redirect('/caseDetail/'+ cases[0]._id);     
      }
      else {
        UserCaseDetail.update({'_id': id}, {$push: {'comments': comments} }, function (err, success) {
          if (err) {
            console.log(err);
          }
          if(success) {
            return res.redirect('/caseDetail/'+ cases[0]._id);     
          }       
        })  
      } 
    }
  })
}

//----------------------------------------------------------
//Upload a document-----------------------------------------
//----------------------------------------------------------


AddMatterCtl.postAddDocument = function(req, res) {
  console.log('hey ' +req.files.doc.name);
  var id = req.body.id,
    oldPath = req.files.doc.path,
    newPath = './upload/';
  if(req.files.doc.size) {
    mkdirp((newPath), '0755', function (err) {
      newPath = newPath + req.files.doc.name;
      if (err) console.log(" MKDIRP ERROR :: " + err);
      fs.rename(oldPath, newPath, function(err) {
        if (err) throw err;
        fs.unlink(oldPath, function() {
          if (err) throw err;
          fs.readFile(newPath, "utf-8", function(error, file) {
            if(error) {
              res.send(error + "\n");
            }   
            console.log('readFile');
            UserCaseDetail.find({'_id': id}, {}, function(err, isFind) {
              if(err) console.log(err);
              console.log('readFile' + isFind);
              if(isFind !== undefined && isFind.length !== 0) {
                var data = {
                  'docType': req.body.docType,
                  'path': newPath
                }
                UserCaseDetail.update({'_id': id}, {$push: {'documents': data}}, function(err, success) {
                  if(err) console.log(err);
                  console.log(isFind);
                  console.log('document uploaded');
                  res.redirect('/caseDetail/'+ isFind[0]._id)
                })
              }
            })
          })
        });
      });    
    });  
  }
  else {req.flash('errors', { msg: 'Please Select a file to be upload' });
    res.redirect('/caseDetail/'+ id)
  }  
}

//-----------------------------------------------------------



