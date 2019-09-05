'use strict';

let mongoose = require('mongoose'),
	  bcrypt = require('bcrypt'),
	  Schema = mongoose.Schema;


let adminSchema =  new Schema({
	email :{
		type:String,
		unique:true,
		required:[true, '{PATH} es obligatorio.']
	},
	password : {
		type : String,
		required:[true, '{PATH} es obligatorio.']
	},
	rol:{
		type : String,
		enum : ['admin']
	}
})


adminSchema.pre('save',function(next){ 

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

module.exports = mongoose.model('Admin',adminSchema)
