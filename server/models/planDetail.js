'use strict'

var mongoose = require('mongoose');


var free = mongoose.Schema({
	schedules: {default: 10, type: number},
	space: {default: 512, type: number}

})

var small = mongoose.Schema({
	schedules: {default: 60, type: number},
	space: {default: 512, type: number}

})

var medium = mongoose.Schema({
	schedules: {default: 150, type: number},
	space: {default: 512, type: number}

})
var large = mongoose.Schema({
	schedules: {default: 150, type: number},
	space: {default: 512, type: number}

})
var PLANDETAIL = new mongoose.Schema({
	free: {},
	small: {},
	medium: {},
	large: {}
})

module.exports = mongoose.model('Logger', PLANDETAIL);
