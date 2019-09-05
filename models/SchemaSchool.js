'use strict';

const mongoose = require('mongoose'),
		Schema = mongoose.Schema;

const schoolSchema = new Schema({
	name : {
		type:String
	},
	avatar : {
		type : String
	}
})

module.exports = mongoose.model('School',schoolSchema)
