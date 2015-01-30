'use strict';


var _ = require('lodash');
var async = require('async');
var User = require('../models/user');
var Logger = require('../models/logger');
var CaseDetail = require('../models/caseDetail');
var UserCaseDetail = require('../models/userCaseDetail');
var moment = require('moment');
var CommonFunc = module.exports;
var Scrap = require('../utils/scrapper');
var finalData =  {};
var oneTimeScrap = {};


var updateAllCases = CommonFunc.updateAllCases = function(callback) {
	CaseDetail.find({}, {}, function(err, data) {
    if(err) console.log(err);
    async.eachSeries(data, function( court, callback1) {
		  console.log('Scrapper starts for ' + court);
		  if(court.supremeCourt != undefined) {  
        var caseType = court.supremeCourt.caseType;
        var caseNumber = court.supremeCourt.caseNumber;
        var caseYear = court.supremeCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapSupremeCourt(caseType, caseNumber, caseYear, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
      }
      else if(court.delhiHighCourt != undefined) {
      	var caseType = court.delhiHighCourt.caseType;
        var caseNumber = court.delhiHighCourt.caseNumber;
        var caseYear = court.delhiHighCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapDelhiHighCourt(caseType, caseNumber, caseYear, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.greenTribunal != undefined) {
      	var caseType = court.greenTribunal.caseType;
        var caseNumber = court.greenTribunal.caseNumber;
        var caseDate = court.greenTribunal.caseDate;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapGreenTribunal(caseType, caseNumber, caseDate, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.telecomDispute != undefined) {
      	var caseType = court.telecomDispute.caseType;
        var caseNumber = court.telecomDispute.caseNumber;
        var caseYear = court.telecomDispute.caseYear;
        var caseDate = court.telecomDispute.caseDate;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapTelecomDispute(caseType, caseNumber, caseYear, caseDate, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.consumerDispute != undefined) {
      	var userType = court.consumerDispute.userType;
      	var stateCode = court.consumerDispute.stateCode;
      	var stateCode_D = court.consumerDispute.stateCode_D;
      	var distCode = court.consumerDispute.distCode;
      	var caseType = court.consumerDispute.caseType;
        var caseNumber = court.consumerDispute.caseNumber;
        var caseYear = court.consumerDispute.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapConsumerDispute(userType, caseNumber, stateCode, stateCode_D, distCode, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.bifrCourt != undefined) {
        var caseNumber = court.bifrCourt.caseNumber;
        var caseYear = court.bifrCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapBifrCourt(caseYear, caseNumber, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.karkarDooma != undefined) {
      	var caseType = court.karkarDooma.caseType;
        var caseNumber = court.karkarDooma.caseNumber;
        var caseYear = court.karkarDooma.caseYear;
        var caseId = court.karkarDooma.caseIdNumber;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseDate' + caseId);
        CommonFunc.scrapKarkardooma(caseType, caseNumber, caseYear, caseId, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else if(court.saket != undefined) {
      	var caseType = court.saket.caseType;
        var caseNumber = court.saket.caseNumber;
        var caseYear = court.saket.caseYear;
        var caseId = court.saket.caseIdNumber;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseId' + caseId);
        CommonFunc.scrapSaket(caseType, caseNumber, caseYear, caseId, id, function(fullData) {
        	console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
        	callback1();
        })  
		  }
		  else {

		  	console.log('all processed');

		  	callback1();
		  }
		}, function(err){
		    if( err ) {
		      console.log('A court failed to process');
		      callback('error');
		    } else {
		      console.log('All court have been processed successfully');
		      callback('success');
		    }
		});
  })
}

// =============================================================================
// Scrap Supreme Court -----------------------------------------------------
// -----------------------------------------------------------------------------
var scrapSupremeCourt = CommonFunc.scrapSupremeCourt = function(caseType, caseNumber, caseYear, id, finalCallBack) {
	Scrap.supremeCourt(caseType, caseNumber, caseYear, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
		  console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].supremeCourt.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].supremeCourt.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].supremeCourt.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].supremeCourt.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].supremeCourt.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'supremeCourt.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'supremeCourt.scrapperHearingDate': scrapper}, $set: {'supremeCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].supremeCourt.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'supremeCourt.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'supremeCourt.caseOrderDates': caseOrderDates}, $set: {'supremeCourt.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 
					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].supremeCourt.caseStatus);
		    	if(caseStatus != undefined && caseStatus != allUsers[0].supremeCourt.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'supremeCourt.caseStatus': caseStatus,'supremeCourt.lastUpdated': new Date()}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'supremeCourt.caseStatus': caseStatus, 'supremeCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var supremeCourtStatus = {
		  		courtName: 'Supreme Court of India',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [supremeCourtStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	  
	})
}
// =============================================================================
// Scrap Delhi High Court -----------------------------------------------------
// -----------------------------------------------------------------------------

var scrapDelhiHighCourt = CommonFunc.scrapDelhiHighCourt = function(caseType, caseNumber, caseYear, id, finalCallBack) {
	Scrap.delhiHighCourt(caseType, caseNumber, caseYear, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
		  console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].delhiHighCourt.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].delhiHighCourt.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].delhiHighCourt.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].delhiHighCourt.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].delhiHighCourt.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'delhiHighCourt.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'delhiHighCourt.scrapperHearingDate': scrapper}, $set: {'delhiHighCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].delhiHighCourt.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'delhiHighCourt.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'delhiHighCourt.caseOrderDates': caseOrderDates},$set: {'delhiHighCourt.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].delhiHighCourt.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].delhiHighCourt.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'delhiHighCourt.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'delhiHighCourt.caseStatus': caseStatus, 'delhiHighCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var delhiHighCourtStatus = {
		  		courtName: 'Delhi High Court',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [delhiHighCourtStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	  
	})
}


// =============================================================================
//Scrap greenTribunal
// =============================================================================

var scrapGreenTribunal = CommonFunc.scrapGreenTribunal = function(caseType, caseNumber, caseDate, id, finalCallBack) {
	Scrap.greenTribunal(caseType, caseNumber, caseDate, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
		  console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].greenTribunal.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].greenTribunal.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].greenTribunal.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].greenTribunal.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].greenTribunal.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'greenTribunal.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'greenTribunal.scrapperHearingDate': scrapper}, $set: {'greenTribunal.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].greenTribunal.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'greenTribunal.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'greenTribunal.caseOrderDates': caseOrderDates}, $set: {'greenTribunal.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].greenTribunal.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].greenTribunal.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'greenTribunal.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'greenTribunal.caseStatus': caseStatus, 'greenTribunal.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var greenTribunalStatus = {
		  		courtName: 'National Green Tribunal',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [greenTribunalStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	  
	})
}

// =============================================================================
//Scrap Telecom Disputes
// =============================================================================

var scrapTelecomDispute = CommonFunc.scrapTelecomDispute = function(caseType, caseNumber, caseYear, caseDate, id, finalCallBack) {
	Scrap.telecomDispute(caseType, caseNumber, caseYear, caseDate, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
	  	console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].telecomDispute.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].telecomDispute.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].telecomDispute.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].telecomDispute.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].telecomDispute.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'telecomDispute.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'telecomDispute.scrapperHearingDate': scrapper}, $set: {'telecomDispute.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].telecomDispute.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'telecomDispute.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'telecomDispute.caseOrderDates': caseOrderDates}, $set: {'telecomDispute.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].telecomDispute.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].telecomDispute.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'telecomDispute.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'telecomDispute.caseStatus': caseStatus, 'telecomDispute.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var telecomDisputetatus = {
		  		courtName: 'Telecom Disputes',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [telecomDisputetatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 5000)  
	})
}

// =============================================================================
//Scrap Consumer Disputes
// =============================================================================

var scrapConsumerDispute = CommonFunc.scrapConsumerDispute = function(userType, caseNumber, stateCode, stateCode_D, distCode, id, finalCallBack) {
	Scrap.consumerDispute(userType, caseNumber, stateCode, stateCode_D, distCode, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
	  	console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].consumerDispute.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].consumerDispute.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].consumerDispute.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].consumerDispute.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].consumerDispute.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'consumerDispute.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'consumerDispute.scrapperHearingDate': scrapper}, $set: {'consumerDispute.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].consumerDispute.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'consumerDispute.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'consumerDispute.caseOrderDates': caseOrderDates}, $set: {'consumerDispute.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].consumerDispute.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].consumerDispute.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'consumerDispute.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'consumerDispute.caseStatus': caseStatus, 'consumerDispute.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var consumerDisputeStatus = {
		  		courtName: 'National Consumer Disputes',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [consumerDisputeStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	})
}

// =============================================================================
//Scrap BIFR Court
// =============================================================================

var scrapBifrCourt = CommonFunc.scrapBifrCourt = function(caseYear, caseNumber, id, finalCallBack) {
	Scrap.boardOfFinance(caseYear, caseNumber, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
	  	console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].bifrCourt.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].bifrCourt.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].bifrCourt.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].bifrCourt.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].bifrCourt.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'bifrCourt.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'bifrCourt.scrapperHearingDate': scrapper}, $set: {'bifrCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].bifrCourt.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'bifrCourt.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'bifrCourt.caseOrderDates': caseOrderDates}, $set: {'bifrCourt.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].bifrCourt.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].bifrCourt.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'bifrCourt.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'bifrCourt.caseStatus': caseStatus, 'bifrCourt.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var bifrCourtStatus = {
		  		courtName: 'BIFR Court',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [bifrCourtStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }
		}, 3000)
	  
	})
}

// =============================================================================
//Scrap Karkardooma
// =============================================================================

var scrapKarkardooma = CommonFunc.scrapKarkardooma	 = function(caseType, caseNumber, caseYear, caseId, id, finalCallBack) {
	Scrap.karkarDooma(caseType, caseNumber, caseYear, caseId, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
	    console.log('data ' + data.caseDate + data.caseOrderDates + data.caseStatus + data.caseBrief);
	  	console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].karkarDooma.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].karkarDooma.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].karkarDooma.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].karkarDooma.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].karkarDooma.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'karkarDooma.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'karkarDooma.scrapperHearingDate': scrapper}, $set: {'karkarDooma.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].karkarDooma.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'karkarDooma.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'karkarDooma.caseOrderDates': caseOrderDates}, $set: {'karkarDooma.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].karkarDooma.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].karkarDooma.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'karkarDooma.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'karkarDooma.caseStatus': caseStatus}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var karkarDoomaStatus = {
		  		courtName: 'District Court Karkardooma',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [karkarDoomaStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	  
	})
}

// =============================================================================
//Scrap District court saket
// =============================================================================

var scrapSaket = CommonFunc.scrapSaket = function(caseType, caseNumber, caseYear, caseId, id, finalCallBack) {
	Scrap.saket(caseType, caseNumber, caseYear, caseId, function(data) {
		setTimeout(function() {
			var nextHearingDate = new Date(data.caseDate),
	    caseOrderDates = new Date(data.caseOrderDates),
	    caseStatus = data.caseStatus,
	    caseBrief = data.caseBrief;
	  	console.log('nextHearingDate ' + nextHearingDate + ' caseOrderDates ' + caseOrderDates + " caseBrief "+caseBrief + ' caseStatus ' + caseStatus);
		  if(nextHearingDate != 'Invalid Date' || caseOrderDates != 'Invalid Date' || caseStatus != undefined || caseBrief != undefined) {
		  	var scrapper = {
			    hearingDate: nextHearingDate,
			    cAt: new Date()
			  } 
			  
			  CaseDetail.find({'_id': id}, {}, function(err, allUsers) {
			    if (err) console.log(err);
			    console.log('allUsers' + allUsers[0].users);
			    var lastHearingDate = (allUsers[0].saket.scrapperHearingDate).length-1;
			    var lastOrderDate = (allUsers[0].saket.caseOrderDates).length-1;
			    console.log('dbhearing ' + allUsers[0].saket.scrapperHearingDate[lastHearingDate].hearingDate + ' scrappedhearing ' + new Date(nextHearingDate) + ' dborder ' +  allUsers[0].saket.caseOrderDates[lastOrderDate] + ' scrappedorder ' + caseOrderDates );
			    if(nextHearingDate != "Invalid Date" && nextHearingDate != undefined && nextHearingDate.getDate() != allUsers[0].saket.scrapperHearingDate[lastHearingDate].hearingDate.getDate()) {
			  		CaseDetail.update({'_id': id}, {$push:{'saket.scrapperHearingDate': scrapper}}, function(err, success) {
		          if(err) console.log(err);
		      		for(var i = 0; i <= allUsers[0].users.length-1; i++ ){
				        console.log(' for user ' + allUsers[0].users[i]);
			          UserCaseDetail.update({'_id': allUsers[0].users[i]},{$push:{'saket.scrapperHearingDate': scrapper}, $set: {'saket.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success) {
				            console.log('userCaseDetail nextHearingDate updated');
				          }
				        }) 
			        }
			        console.log('nextHearingDate updated')
		  			})
			  	}
			  	else {
					  console.log('Same hearing date or hearing date not found'); 
					}	 

					if(caseOrderDates != "Invalid Date" &&  caseOrderDates != undefined && caseOrderDates.getDate() != allUsers[0].saket.caseOrderDates[lastOrderDate].getDate()) {        
		        CaseDetail.update({'_id': id}, {$push:{'saket.caseOrderDates': caseOrderDates}}, function(err, success1) {
		        	if(err) console.log(err);
		      		for(var j = 0; j <= allUsers[0].users.length-1; j++ ){
		      			console.log('for user ' + allUsers[0].users[j] );
			        	UserCaseDetail.update({'_id': allUsers[0].users[j]}, {$push:{'saket.caseOrderDates': caseOrderDates}, $set: {'saket.lastUpdated': new Date()}}, function(err, success1) {
				          if(err) console.log(err);
				          if(success1) {
				            console.log('userCaseDetail caseOrderDates updated');
				          }
				        })
			       	}
			       	console.log('caseOrderDates updated')
		      	})
		      }
		      else {
					  console.log('Same Order Date or order date not found');  
					}	 

					console.log('statusFound' + caseStatus +  'statusSaved'  +allUsers[0].saket.caseStatus);

		    	if(caseStatus != undefined && caseStatus != allUsers[0].saket.caseStatus) { 
		    		CaseDetail.update({'_id': id}, {$set:{'saket.caseStatus': caseStatus}}, function(err, success2) {       	
		        	if(err) console.log(err);
		      		for(var k = 0; k <= allUsers[0].users.length-1; k++ ){
			        	UserCaseDetail.update({'_id': allUsers[0].users[k]},{$set:{'saket.caseStatus': caseStatus, 'saket.lastUpdated': new Date()}}, function(err, success) {
				          if(err) console.log(err);
				          if(success2) {
				            console.log('userCaseDetail status updated');
				          }
				        })
			        }	
			        console.log('status updated')
		    		})
		  		}
		  		else {
					  console.log('Same status or status not found ');
					}	 
					delete finalData.fail;
					delete finalData.success;
					console.log('deleted object for success ' + finalData.fail + ' '+ finalData.success);
					finalData.success = 'success';
					console.log('all caseDetail successfully updated ')	;
			  	finalCallBack(finalData);
				})
		  }
		  else {
		  	console.log('scrappping failed for case id ' + id );
		  	var saketStatus = {
		  		courtName: 'District Court saket',
		  		caseNumber: caseNumber,
		  		updated: false,
		  	}
		  	var logger = new Logger({
		  		day: new Date(),
		  		status: [saketStatus]
		  	})
		  	logger.save(function(err) {
		  		if(err) console.log(err);
		  		delete finalData.fail;
		  		delete finalData.success;
		  		console.log('deleted object for fail' + finalData.fail + ' '+ finalData.success);
		  		finalData.fail = 'fail';
		  		console.log('logger for failure saved ' + finalData.fail);
		  		finalCallBack(finalData);
		  	})
		  }	
		}, 3000)
	  
	})
}

// =============================================================================
//Scrap Individual Court
// =============================================================================

var scrapIndividual = CommonFunc.scrapIndividual = function(courtName, callback) {
	CaseDetail.find({}, {}, function(err, data) {
    if(err) console.log(err);
    async.eachSeries(data, function( court, callback1) {
      if(court.supremeCourt != undefined && courtName === 'supreme-court') {  
        var caseType = court.supremeCourt.caseType;
        var caseNumber = court.supremeCourt.caseNumber;
        var caseYear = court.supremeCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + ' caseType ' + caseType + ' caseYear ' + caseYear);
        CommonFunc.scrapSupremeCourt(caseType, caseNumber, caseYear, id, function(fullData) {
          console.log('callback recieved inside for loop supremeCourt' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.delhiHighCourt != undefined && courtName === 'delhi-high-court') {
        var caseType = court.delhiHighCourt.caseType;
        var caseNumber = court.delhiHighCourt.caseNumber;
        var caseYear = court.delhiHighCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapDelhiHighCourt(caseType, caseNumber, caseYear, id, function(fullData) {
          console.log('callback recieved inside for loop delhiHighCourt' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.greenTribunal != undefined &&  courtName === 'national-green-tribunal') {
        var caseType = court.greenTribunal.caseType;
        var caseNumber = court.greenTribunal.caseNumber;
        var caseDate = court.greenTribunal.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseDate' + caseDate);
        CommonFunc.scrapGreenTribunal(caseType, caseNumber, caseDate, id, function(fullData) {
          console.log('callback recieved inside for loop for greenTribunal' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.telecomDispute != undefined && courtName === 'telecom-dispute') {
        var caseType = court.telecomDispute.caseType;
        var caseNumber = court.telecomDispute.caseNumber;
        var caseYear = court.telecomDispute.caseYear;
        var caseDate = court.telecomDispute.caseDate;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseDate' + caseDate);
        CommonFunc.scrapTelecomDispute(caseType, caseNumber, caseYear, caseDate, id, function(fullData) {
          console.log('callback recieved inside for loop telecomDispute' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.consumerDispute != undefined && courtName === 'national-consumer-disputes') {
        var userType = court.consumerDispute.userType;
        var stateCode = court.consumerDispute.stateCode;
        var stateCode_D = court.consumerDispute.stateCode_D;
        var distCode = court.consumerDispute.distCode;
        var caseType = court.consumerDispute.caseType;
        var caseNumber = court.consumerDispute.caseNumber;
        var caseYear = court.consumerDispute.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber consumerDispute' + caseNumber);
        CommonFunc.scrapConsumerDispute(userType, caseNumber, stateCode, stateCode_D, distCode, id, function(fullData) {
          console.log('callback recieved inside for loop' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.bifrCourt != undefined && courtName === 'bifr') {
        var caseNumber = court.bifrCourt.caseNumber;
        var caseYear = court.bifrCourt.caseYear;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber);
        CommonFunc.scrapBifrCourt(caseYear, caseNumber, id, function(fullData) {
          console.log('callback recieved inside for loop bifrCourt' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.karkarDooma != undefined && courtName === 'karkardooma') {
        var caseType = court.karkarDooma.caseType;
        var caseNumber = court.karkarDooma.caseNumber;
        var caseYear = court.karkarDooma.caseYear;
        var caseId = court.karkarDooma.caseIdNumber;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseId' + caseId);
        CommonFunc.scrapKarkardooma(caseType, caseNumber, caseYear, caseId, id, function(fullData) {
          console.log('callback recieved inside for loop karkarDooma' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else if(court.saket != undefined && courtName === 'saket') {
        var caseType = court.saket.caseType;
        var caseNumber = court.saket.caseNumber;
        var caseYear = court.saket.caseYear;
        var caseId = court.saket.caseIdNumber;
        var id = court._id;
        console.log('scrapper starts for caseNumber ' + caseNumber + 'caseType' + caseType + 'caseId' + caseId);
        CommonFunc.scrapSaket(caseType, caseNumber, caseYear, caseId, id, function(fullData) {
          console.log('callback recieved inside for loop saket' + "STATUS:::::" +  fullData.success + " "+ fullData.fail);
          callback1();
        })  
      }
      else {

        console.log('court not match');

        callback1();
      }
    }, function(err){
        if( err ) {
          console.log('A court failed to process');
          callback('error');
        } else {
          console.log('All court have been processed successfully');
          oneTimeScrap.inprocess = false;
          callback(oneTimeScrap);
        }
    });
  })
}