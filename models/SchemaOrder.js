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
		type : Date
	},
	total :{
		type : Number
	},
	status : {
		type : Boolean,
		default : false
	},
	school : {
    	type : Schema.ObjectId, ref: "School"
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
