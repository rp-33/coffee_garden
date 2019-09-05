'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const categorySchema = new Schema({
	name  : {
		type : String,
		unique :true
	},
	school : {
    	type : Schema.ObjectId, ref: "School"
    }
})

module.exports = mongoose.model('Category',categorySchema);
