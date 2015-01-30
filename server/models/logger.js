'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


var status = mongoose.Schema({
	courtName: {type: String},
	caseNumber: {type: String},
	updated: {type: Boolean}
})

var LoggerSchema = new mongoose.Schema({
	day: {type: Date},
	status: [status]
})

module.exports = mongoose.model('Logger', LoggerSchema);
