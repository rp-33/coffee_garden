'use strict';

let mongoose = require('mongoose'),
	Schema =  mongoose.Schema;

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
	products : {
		type : Array,
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
	}
})

module.exports = mongoose.model('Order',orderSchema);
