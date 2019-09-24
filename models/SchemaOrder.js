'use strict';

let mongoose = require('mongoose'),
	Schema =  mongoose.Schema;

let orderSchema = new Schema({
	user : {
		type: Schema.ObjectId, ref: "User" 
	},
	quantity : {
		type: Number
	},
	date : {
		type : Date
	},
	name : {
		type:String
	},
	price :{
		type :Number
	},
	image : {
		type : String
	}
})

module.exports = mongoose.model('Order',orderSchema);
