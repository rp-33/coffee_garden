'use strict';

let mongoose = require('mongoose'),
	 Product = require('../models/SchemaProduct'),
	Category = require('../models/SchemaCategory'),
		User = require('../models/SchemaUser'),
	   token = require('../services/token'),
	  bcrypt = require('bcrypt'),
  cloudinary = require('../configuration/cloudinary');

module.exports = {

	signupSeller : async (req,res)=>{
		try
		{
			let {email,names,lastNames,phone,admin} =  req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'mail already exists'});

			let newUser = new User({
				email: email.toLocaleLowerCase(),
				names,
				lastNames,
				phone,
				ci,
				refAdmin : admin,
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
				rol : user.rol,
				refAdmin : user.refAdmin
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
			let user = User.updateOne({_id:req.user},{$set:{avatar:image}});
			if(user.ok>0 && user.n>0) return res.status(201).send({avatar:image});
			res.status(404).send({message:'user not found'});


		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	addToCategory : async (req,res)=>{
		try
		{

			let find = await Category.findOne({name:req.query.name.toLocaleLowerCase()});

			if(find) return res.status(204).send({message:'exist category'});

			const newCategory = new Category({
				name: req.query.name.toLocaleLowerCase()
			})

			const category = await newCategory.save();

			res.status(201).send({
				_id: category._id,
				name : category.name
			})
		}
		catch(err)
		{
			res.status(500).send({err})
		}

	},
	deleteToCategory : async (req,res)=>{
		try
		{

			const result =  await Category.deleteOne({_id:req.query._id.toLocaleLowerCase()});
			if(result.ok>0 && result.n>0) return res.status(204).send({message:'delete message'});
			res.status(404).send({message:'resource not found'});

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	editToCategory : async (req,res)=>{
		try
		{
			const result = await Category.updateOne({_id:req.query._id},{$set:{name:req.query.name}});
			if(result.ok>0 && result.n>0) return res.status(204).send({message:'success'});
			res.status(404).send({message:'resource not found'});

		}
		catch(err)
		{
			res.status(500).send({err})	
		}
	},
	findAllCategory : async (req,res)=>{

		try{
			const result = await Category.find({});
			if(!result) return res.status(204).send({message:'empty resource'});
			res.status(200).send(result);
		}
		catch(err)
		{
			res.status(500).send({err})
		}

	},
	addToProduct : async (req,res)=>{
		try
		{
			let image = await cloudinary.v2.uploader.upload(req.file.path);
			let {category,name,price} = req.body;

			let newProduct  = new Product({
				category,
				name,
				price,
				image:image.secure_url
			})	

			let product = await newProduct.save();

			res.status(201).send({
				_id:product._id,
				category: product.category,
				name: product.category,
				price: product.price,
				image:product.image
			})
		}
		catch(err)
		{
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
			let products = await Product.find({status:true});
			if(!products) return res.status(204).send();
			res.status(200).send(products)
		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	signupParent :  async (re,res)=>{
		try
		{
			let {email,names,lastNames,codeCi,ci,phone,countryCode} = req.body;

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
				rol : 'representative'
			})

			user =  newUser.save();

			res.status(201).send({
				_id:user._id,
				token : token.create(user,360),
				names : user.names,
				lastNames : user.lastNames,
				countryCode: user.countryCode,
				phone : user.phone,
				ci : user.ci,
				rol : user.rol
			})
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

            if(!person) return res.status(401).send({error:'Mail invalid or does not exist'});

            if(!bcrypt.compareSync(req.body.password.toLocaleLowerCase(),person.password)) return res.status(403).send({error:'password invalidate'});

            const connect =  await User.updateOne({"email" : req.body.email.toLocaleLowerCase()},{$set:{connected:true}});

            res.status(200).send({
                _id : person._id,
                token : token.create(person,360),
                names : person.names,
                lastNames : person.lastNames,
                email : person.email,
                avatar : person.avatar,
               	balance : (person.balance != 0) ? person.balance : null,
               	rol : person.rol,
               	representative : (person.representative == 'represented') ? person.representative  : null,
               	refAdmin : (person.representative == 'seller') ?  person.refAdmin : null
            });

		}
		catch(err)
		{
			res.status(500).send({err});
		}
	}
}