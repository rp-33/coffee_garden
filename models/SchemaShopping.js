'use strict';

const mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let productsSchema = new Schema({
	quantity : {
		type: Number
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

let shoppingSchema = new Schema({
	vouched : {
		type : String
	},
	date : {
		type : String
	},
	products : [productsSchema]
})

module.exports = mongoose.model('Shopping',shoppingSchema)
