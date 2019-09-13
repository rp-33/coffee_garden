'use strict';

let mongoose = require('mongoose'),
	 Product = require('../models/SchemaProduct'),
	Category = require('../models/SchemaCategory'),
	  School = require('../models/SchemaSchool'),
		User = require('../models/SchemaUser'),
	   token = require('../services/token'),
	  bcrypt = require('bcrypt'),
  cloudinary = require('../configuration/cloudinary');

module.exports = {

	signupSeller : async (req,res)=>{
		try
		{
			let {email,names,lastNames,phone,school} =  req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'mail already exists'});

			let newUser = new User({
				email: email.toLocaleLowerCase(),
				names,
				lastNames,
				phone,
				ci,
				school,
				rol : 'seller'
			})

			user =  newUser.save();

			res.status(201).send({
				_id:user._id,
				token : token.create(user,360),
				names : user.names,
				lastNames : user.lastNames,
				phone : user.phone,
				ci : user.ci,
				school : user.school,
				rol : user.rol,
			})

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	deleteSeller : async (req,res)=>{
		try
		{
			let user = await User.deleteOne({_id:req.query._id});
			if(user.ok>0 && user.n>0) return res.status(204).send({message:'delete user'});
			res.status(404).send({message:'user not found'})
		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	editAvatarUser : async (req,res)=>{
		try
		{	
			let image = await cloudinary.v2.uploader.upload(req.file.path);

			let user = User.updateOne({_id:req.user},{$set:{avatar:image.secure_url}});

			if(user.ok>0 && user.n>0) return res.status(201).send({avatar:image.secure_url});

			res.status(404).send({message:'user not found'});


		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	createCategory : async (req,res)=>{
		try
		{

			let {name,school} = req.body

			let find = await Category.findOne({name:name.toLocaleLowerCase()});

			if(find) return res.status(204).send();

			const newCategory = new Category({
				name,
				school
			})

			const category = await newCategory.save();

			res.status(201).send({
				_id: category._id,
				name : category.name,
				school : category.school
			})
		}
		catch(err)
		{
			res.status(500).send({err})
		}

	},
	deleteCategory : async (req,res)=>{
		try
		{

			const result =  await Category.deleteOne({_id:req.query._id.toLocaleLowerCase()});
			if(result.ok>0 && result.n>0) return res.status(204).send();
			res.status(404).send({message:'resource not found'});

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	editCategory: async (req,res)=>{
		try
		{

			let {_id,name} = req.query;
			const result = await Category.updateOne({_id},{$set:{name}});
			if(result.ok>0 && result.n>0) return res.status(204).send({message:'success'});
			res.status(404).send({message:'recurso no encontrado'});

		}
		catch(err)
		{
			res.status(500).send({err})	
		}
	},
	findAllCategory : async (req,res)=>{

		try
		{
			const result = await Category.find({school:req.query.school},{product:false});
			if(!result) return res.status(404).send({message:'recurso no encontrado'});
			res.status(200).send(result);
		}
		catch(err)
		{
			res.status(500).send({err})
		}

	},
	 createProduct  : async (req,res)=>{
		try
		{
			let image = await cloudinary.v2.uploader.upload(req.file.path);

			let {_id,name,price} = req.body;

			let result = await Category.findOneAndUpdate({_id},{$push:{products:{
																			name,
																			price:parseInt(price),
																			image : image.secure_url
																			}	
																		}}
																		,
																		{new: true});


			let product = result.products[result.products.length - 1];

			if(product) return res.status(201).send({
														_id : product._id,
														image : product.image
													});

			res.status(404).send({message:'recurso no encontrado'});

		}
		catch(err)
		{
			console.log(err)
			res.status(500).send({err})
		}
	},
	deleteToProduct : async (req,res)=>{
		try
		{
			let product = await Product.deleteOne({_id:req.query._id});
			if(product.ok>0 && product.n>0) return res.status(204).send({message:'remove product'});
			res.status(404).send({message:'resource not found'});

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	editToProduct : async (req,res)=>{
		try
		{

			let {_id,name,price,category,status} = req.query;
			let product = await Product.updateOne({_id},{ $set:{name,price,category,status} });
			res.status(201).send({message:'updated product'});

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	editImageProduct : async (req,res)=>{
		try{

			let image = await cloudinary.v2.uploader.upload(req.file.path);

			let product = await Product.update({_id:req.body._id},{$set:{image:image.secure_url}});

			res.status(201).send({
				_id:req.body._id,
				image:image.secure_url
			});
		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	findAllProducts : async (req,res)=>{
		
		try
		{
			const result = await Category.find({school:req.query.school});
			if(!result) return res.status(404).send({message:'recurso no encontrado'});
			res.status(200).send(result);
		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	signupParent :  async (re,res)=>{
		try
		{
			let {email,names,lastNames,codeCi,ci,phone,countryCode,school} = req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'mail already exists'});

			let newUser = new User({
				email: email.toLocaleLowerCase(),
				names,
				lastNames,
				phone,
				codeCi,
				ci,
				countryCode,
				school,
				rol : 'representative'
			})

			user =  newUser.save();

			res.status(201).send({
				_id:user._id,
				token : token.create(user,360),
				email:user.email,
				names : user.names,
				lastNames : user.lastNames,
				countryCode: user.countryCode,
				phone : user.phone,
				ci : user.ci,
				school : user.school,
				rol : user.rol
			})
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	createRepresented : async (req,res)=>{
		try
		{
			let {email,names,lastNames,representative} = req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'mail already exists'});

			let newUser = new User({
				email: email.toLocaleLowerCase(),
				names,
				lastNames,
				representative,
				rol : 'represented'
			})

			user =  newUser.save();

			res.status(201).send({
				_id:user._id,
				token : token.create(user,360),
				email:user.email,
				names : user.names,
				lastNames : user.lastNames,				
				rol : user.rol
			})

		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	deleteRepresented :  async (req,res)=>{
		try
		{
			let user = await User.deleteOne({_id:req.query._id});
			if(user.ok>0 && user.n>0) return res.status(204).send({message:'delete user'});
			res.status(404).send({message:'resource not found'});
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	login : async (req,res)=>{
		try
		{

			const person = await User.findOne({"email" : req.body.email.toLocaleLowerCase()});

            if(!person) return res.status(401).send({error:'Correo es incorrecto o no existe'});

            if(!bcrypt.compareSync(req.body.password.toLocaleLowerCase(),person.password)) return res.status(403).send({error:'contraseña incorrecta'});

            if(person.rol == "admin")
            {
            	res.status(200).send({
            		_id: person._id,
            		token : token.create(person,360),
                	email : person.email,
                	rol : person.rol,
                	isAuthenticated : true
            	})
            }
            else
            {
            	res.status(200).send({
                	_id : person._id,
                	token : token.create(person,360),
                	names : person.names,
                	lastNames : person.lastNames,
                	email : person.email,
                	avatar : person.avatar,
               		balance : person.balance,
               		rol : person.rol,
               		isAuthenticated : true,
               		representative : (person.representative == 'represented') ? person.representative  : null,
            	});
            }

		}
		catch(err)
		{
			console.log(err)
			res.status(500).send({err});
		}
	},
	findAllSchool : async (req,res)=>{
		try
		{
			let schools = await School.find({});
			res.status(200).send(schools);
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	createSchool : async (req,res)=>{
		try
		{

			let image = await cloudinary.v2.uploader.upload(req.file.path);

			let newSchool = new School({
				name : req.body.name,
				avatar : image.secure_url
			})

			newSchool.save();

			res.status(201).send({
				_id : newSchool._id,
				name :  newSchool.name,
				avatar : newSchool.avatar
			})		
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	deleteSchool : async (req,res)=>{
		try
		{

			let school = await School.deleteOne({_id:req.query._id});
			if(school.ok>0 && school.n>0) return res.status(204).send({message:'delete success'});
			res.status(404).send({message:'resource not found'});
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	}

}