'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;


const productSchema =  new Schema({
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

const categorySchema = new Schema({
	name  : {
		type : String,
		lowercase: true
	},
	school : {
    	type : Schema.ObjectId, ref: "School"
    },
    products : [productSchema]
})

module.exports = mongoose.model('Category',categorySchema);
