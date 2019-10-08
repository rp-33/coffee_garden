'use strict';

const mongoose = require('mongoose'),
		Schema = mongoose.Schema;

const voucherSchema = new Schema({
	user : {
		type: Schema.ObjectId, ref: "User" 
	},
	image : {
		type : String
	},
	status : {
		type:Boolean,
		default : false
	},
	school : {
    	type : Schema.ObjectId, ref: "School"
    }
})

module.exports = mongoose.model('Voucher',voucherSchema)
