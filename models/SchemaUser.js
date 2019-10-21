'use strict';

let mongoose = require('mongoose'),
 	  bcrypt = require('bcrypt-nodejs'),
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
		type:Number,
		default :0
	},
	representative:{
		type : Schema.ObjectId, ref: "User" 
	},
	codeCi:{
		type:String
	},
	ci:{
		type:String
	},
	countryCode :{
		type:Number
	},
	phone:{
		type:String
	},
	rol :{ 
		type: String,
        enum: ['admin','represented','representative','seller']
    },
    school : {
    	type : Schema.ObjectId, ref: "School"
    },
    vip : {
    	type : Boolean,
    	default : false
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