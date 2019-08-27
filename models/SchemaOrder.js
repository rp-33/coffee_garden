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
	product:{
		type: Schema.ObjectId, ref: "Product" 
	}

})

module.exports = mongoose.model('Order',orderSchema);
