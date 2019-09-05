'use strict';

let mongoose = require('mongoose'),
 	  bcrypt = require('bcrypt'),
	  Schema = mongoose.Schema;

let userSchema = new Schema({
	names:{
		type:String
	},
	lastNames : {
		type:String
	},
	email :{
		type:String,
		unique:true,
		required:[true, '{PATH} es obligatorio.']
	},
	password:{
		type:String,
		required:[true, '{PATH} es obligatorio.']
	},
	avatar:{
		type:String
	},
	balance : {
		type:Number
	},
	representative:{
		type : Schema.ObjectId, ref: "User" 
	},
	codeCi:{
		type:String
	},
	ci:{
		type:String,
		unique:true
	},
	countryCode :{
		type:Number
	},
	phone:{
		type:String,
		unique:true
	},
	rol :{ 
		type: String,
        enum: ['represented','representative','seller']
    },
    school : {
    	type : Schema.ObjectId, ref: "School"
    }
})

userSchema.pre('save',function(next){ 

    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {

       if (err) return next(err); 

       bcrypt.hash(this.password,salt,null,(hashError,hash)=>{

        if (hashError) return next(hashError);
        
        this.password = hash;

        next();
        
       });

    });
});


module.exports = mongoose.model('User',userSchema);