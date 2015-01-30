'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var isScrapped = mongoose.Schema({
	date: {type: Date},
	isScrapped: {type: Boolean, default: false}
}, {_id: false});

var SchedulerSchema = new mongoose.Schema({
	scrapTime: {type: String},
	isScrapped: [isScrapped]
});

module.exports = mongoose.model('Scheduler', SchedulerSchema);
