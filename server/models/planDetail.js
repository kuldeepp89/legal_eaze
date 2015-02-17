'use strict'

var mongoose = require('mongoose');


var free = mongoose.Schema({
	schedules: {default: 10, type: Number},
	space: {default: 0.5, type: Number},
	money: {default: 0, type: Number},
	moneyPerYear: {default: 0, type: Number}

})

var small = mongoose.Schema({
	schedules: {default: 60, type: Number},
	space: {default: 2, type: Number},
	moneyPerMonth: {default: 450, type: Number},
	moneyPerYear: {default: 5000, type: Number}


})

var medium = mongoose.Schema({
	schedules: {default: 150, type: Number},
	space: {default: 6, type: Number},
	moneyPerMonth: {default: 750, type: Number},
	moneyPerYear: {default: 8500, type: Number}

})
var large = mongoose.Schema({
	schedules: {default: 500, type: Number},
	space: {default: 50, type: Number},
	moneyPerMonth: {default: 1000, type: Number},
	moneyPerYear: {default: 11200, type: Number}


})
var PLANDETAILSCHEMA = new mongoose.Schema({
	free: {},
	small: {},
	medium: {},
	large: {}
})

module.exports = mongoose.model('PlanDetail', PLANDETAILSCHEMA);
