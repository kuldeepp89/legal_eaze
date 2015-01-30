'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var searchPlugin = require('mongoose-search-plugin');

var scrapperHearingDate = mongoose.Schema({
  hearingDate: {type: Date, default: '01/01/1970'},
  cAt: Date
}, {_id: false});



var supremeCourt = mongoose.Schema({
  scrapperHearingDate: [scrapperHearingDate],
  caseType: {type: String},
  caseNumber: String,
  caseYear: {type: Number},
  caseStatus: {type: String},
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}
},{ _id : false });

var delhiHighCourt = mongoose.Schema({
  scrapperHearingDate: [scrapperHearingDate],
  caseType: {type: String},
  caseNumber: String,
  caseYear: {type: Number},
  caseStatus: {type: String} ,
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}
},{ _id : false });

var greenTribunal = mongoose.Schema({
  scrapperHearingDate: [scrapperHearingDate],
  caseType: {type: String},
  caseNumber: String,
  caseDate: {type: String},
  caseStatus: {type: String} ,
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}
},{ _id : false });

var companyLawBoard = mongoose.Schema({
  scrapperHearingDate: [scrapperHearingDate],
  caseType: {type: String},
  caseNumber: String,
  caseDate: {type: Date},
  caseStatus: {type: String},
  caseBrief: String,
  courtType: String,
  caseLink: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}

},{ _id : false });

var consumerDispute = mongoose.Schema({
  scrapperHearingDate: [scrapperHearingDate],
  caseLoginType: {type: String},
  caseNumber: String,
  caseStatus: {type: String},
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}

},{ _id : false });

var competitiveTribunal = mongoose.Schema({
  caseType: {type: String},
  caseNumber: String,
  caseDate: {type: Date},
  caseBrief: String,
  nextOrderDate: {type: Date},
  orderDateArray: [{type: Date}],
  orderUpdate: {type: String},
  lastUpdated: {type: Date}  

},{ _id : false });


var telecomDispute = mongoose.Schema({
  caseType: String,
  caseNumber: String,
  caseYear: String,
  caseDate: Date,
  orderDate: Date,
  caseBrief: String,
  nextOrderDate: {type: Date},
  orderDateArray: [{type: Date}],
  orderUpdate: {type: String},
  lastUpdated: {type: Date}
  
},{ _id : false });

var bifrCourt = mongoose.Schema({
  caseNumber: String,
  caseYear: String,
  scrapperHearingDate: [scrapperHearingDate],
  caseStatus: {type: String},
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  lastUpdated: {type: Date}
},{ _id : false });

var karkarDooma = mongoose.Schema({
  caseNumber: String,
  caseYear: String,
  caseType: String,
  caseIdNumber: String,
  caseStatus: {type: String},
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  scrapperHearingDate: [scrapperHearingDate],
  lastUpdated: {type: Date}
},{ _id : false });

var saket = mongoose.Schema({
  caseNumber: String,
  caseYear: String,
  caseType: String,
  caseIdNumber: String,
  caseStatus: {type: String},
  caseBrief: String,
  caseOrderDates: [{type: Date}],
  scrapperHearingDate: [scrapperHearingDate],
  lastUpdated: {type: Date}

},{ _id : false });


var CaseDetailSchema = new mongoose.Schema({
  supremeCourt: {},
  delhiHighCourt: {},
  greenTribunal: {},
  consumerDispute: {},
  companyLawBoard: {},
  competitiveTribunal: {},
  telecomDispute: {},
  bifrCourt: {},
  karkarDooma: {},
  saket: {},
  users: [{type: String}]
});



module.exports = mongoose.model('CaseDetail', CaseDetailSchema);
