'use strict';

let mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

let productSchema =  new Schema({
	category: { 
		type: Schema.ObjectId, ref: "Category" 
	},
	name :{
		type : String
	},
	image:{
		type : String
	},
	price:{
		type : Number
	},
	status : {
		type: Boolean,
		default : true
	}
})

module.exports =  mongoose.model('Product',productSchema);