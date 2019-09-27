'use strict';

let mongoose = require('mongoose'),
	Schema =  mongoose.Schema;

let productsSchema = new Schema({
	quantity : {
		type: Number
	},
	date : {
		type : String
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

let orderSchema = new Schema({
	user : {
		type: Schema.ObjectId, ref: "User" 
	},
	vouched : {
		type : String
	},
	date : {
		type : String
	},
	total :{
		type : Number
	},
	status : {
		type : Boolean,
		default : false
	},
	products : [productsSchema]
})

module.exports = mongoose.model('Order',orderSchema);
