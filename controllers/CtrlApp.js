'use strict';

let	Category = require('../models/SchemaCategory'),
	  School = require('../models/SchemaSchool'),
		User = require('../models/SchemaUser'),
	   Order = require('../models/SchemaOrder'),
	Shopping = require('../models/SchemaShopping'),
	 Voucher = require('../models/SchemaVoucher'),
	   token = require('../services/token'),
	  bcrypt = require('bcrypt-nodejs'),
  randomatic = require('randomatic'),
  cloudinary = require('../configuration/cloudinary');

module.exports = {
	deleteSeller : async (req,res)=>{
		try
		{
			let user = await User.deleteOne({_id:req.query._id});
			if(user.ok>0 && user.n>0) return res.status(204).send();
			res.status(404).send({error:'Usuario no encontrado'})
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	editAvatarUser : async (req,res)=>{
		try
		{	
			let image = await cloudinary.v2.uploader.upload(req.file.path);

			let user = User.updateOne({_id:req.user},{$set:{avatar:image.secure_url}});

			if(user.ok>0 && user.n>0) return res.status(201).send({avatar:image.secure_url});

			res.status(404).send({error:'Recurso no encontrado'});


		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	createCategory : async (req,res)=>{
		try
		{

			let {name,school} = req.body
			name = name.toLocaleLowerCase();
			let find = await Category.findOne({name,school});

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
			res.status(404).send({error:'Recurso no encontrado'});

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	editCategory: async (req,res)=>{
		try
		{
			let {_id,name} = req.query;
			const result = await Category.updateOne({_id},{$set:{name}});
			if(result.ok>0 && result.n>0) return res.status(204).send({message:'success'});
			res.status(404).send({error:'Recurso no encontrado'});

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllCategory : async (req,res)=>{

		try
		{
			const result = await Category.find({school:req.query.school},{product:false});
			if(result.length===0) return res.status(204).send();
			res.status(200).send(result);
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
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

			res.status(404).send({Error:'Recurso no encontrado'});

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	deleteToProduct : async (req,res)=>{
		try
		{
			let product = await Product.deleteOne({_id:req.query._id});
			if(product.ok>0 && product.n>0) return res.status(204).send();
			res.status(404).send({error:'Recurso no encontrado'});

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
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
	signup :  async (req,res)=>{
		try
		{

			let {email,names,lastNames,codeCi,ci,phone,countryCode,school,password} = req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(204).send();

			user = new User({
				email: email.toLocaleLowerCase(),
				password: password.toLocaleLowerCase(),
				names,
				lastNames,
				phone,
				codeCi,
				ci,
				countryCode,
				school,
				rol:'representative'
			})

			await user.save();

			res.status(201).send({
				_id : user._id,
                token : token.create(user,360),
                names : user.names,
                lastNames : user.lastNames,
                email : user.email,
                avatar : user.avatar,
               	rol : user.rol,
               	school : user.school,
               	isAuthenticated : true
           	})
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	findAllRepresented :async (req,res)=>{
		try
		{
			let users =  await User.find({representative : req.user},{_id:true,names:true,lastNames:true,avatar:true})
			if(users.length>0) return res.status(200).send(users);
			res.status(204).send()

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	saveRepresented : async (req,res)=>{
		try
		{
			let {names,lastNames,email,password,school} = req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'correo ya existe!'});

			let newUser = new User({
				email,
				password,
				names,
				lastNames,
				representative : req.user,
				school,
				rol : 'represented'
			})

			await newUser.save();

			res.status(201).send({
				_id : newUser._id,
				names : newUser.names,
				lastNames : newUser.lastNames			
			})

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	deleteRepresented :  async (req,res)=>{
		try
		{
			let user = await User.deleteOne({_id:req.query._id,representative:req.user});
			if(user.ok>0 && user.n>0) return res.status(204).send();
			res.status(404).send({error:'Usuario no encontrado'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
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
               		rol : person.rol,
               		isAuthenticated : true,
               		school : person.school,
               		representative : person.representative
            	});
            }

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	findAllSchool : async (req,res)=>{
		try
		{
			let schools = await School.find({});
			if(schools.length == 0) return res.status(204).send();
			res.status(200).send(schools);

		}
		catch(err)
		{
			res.status(500).send({error:'error en el servidor'});
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
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	deleteSchool : async (req,res)=>{
		try
		{

			let school = await School.deleteOne({_id:req.query._id});
			if(school.ok>0 && school.n>0) return res.status(204).send();
			res.status(404).send({error:'Recurso no encontrado'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'});
		}
	},
	editNameSchool : async (req,res)=>{
		try
		{
			let school = await School.findOne({name:req.query.name},{name:true});
			if(school) return res.status(204).send();
			school = await School.updateOne({_id:req.query._id},{$set:{name:req.query.name}});
			if(school.ok>0 && school.n>0) return res.status(201).send({message:'Guardado con exito'});
			res.status(404).send({error:'Recurso no existe'});
		}
		catch(err)
		{
			res.status(500).send({err});
		}

	},
	editAvatarSchool : async (req,res)=>{
		try
		{
			let image = await cloudinary.v2.uploader.upload(req.file.path);
			let school = await School.updateOne({_id:req.body._id},{$set:{avatar:image.secure_url}});
			if(school.ok>0 && school.n>0) return res.status(201).send({image:image.secure_url});
			res.status(404).send({error:'Recurso no existe'});
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	findBalance : async (req,res)=>{
		try
		{
			let balance = await User.findOne({_id:req.query.user},{balance:true,_id:false});
			if(!balance) res.status(404).send({message:'resource not found'});
			res.status(200).send(balance);
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	saveOrder :  async (req,res)=>{
		try
		{

			let {products,total,user,date,school} = req.body;

			date = new Date(date);
			let {balance,vip} = await User.findOne({_id:user},{_id:false,balance:true,vip:true});

			if(!vip && balance < total) return res.status(204).send()

			let order = new Order({
				vouched :  randomatic('0',6),
				date : new Date(date),
				user, 
				products,
				school,
				total : parseInt(total)
			})

			await order.save();

			balance = balance - total;

			await User.updateOne({_id:user},{$set:{balance}});

			res.status(201).send({
				vouched : order.vouched,
				balance
			})
		}
		catch(err)
		{
			res.status(500).send({error:'error en el el servidor'});
		}
	},
	findAllOrders : async (req,res)=>{
		try
		{	
			let {user,date} = req.query;
			let orders = await Order.find({user,date});
			if(orders.length>0) res.status(200).send(orders)
			res.status(204).send()
		}
		catch(err)
		{
			res.status(500).send({err});
		}
	},
	findAllHistory : async (req,res)=>{
		try
		{	
			let {user,date} = req.query;
			let orders = await Order.find({user,status:true}).sort({date:-1});
			if(orders.length>0) res.status(200).send(orders)
			res.status(204).send()
		}
		catch(err)
		{
			res.status(500).send({error:'error en el servidor'});
		}
	},
	findAllRepresentative : async (req,res)=>{
		try
		{
			let {school} =  req.query;
			let users = await User.find({school,rol:'representative'},{password:false,codeCi:false,rol:false});
			if(users.length>0) return res.status(200).send(users);
			res.status(204).send();
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	addBalance : async (req,res)=>{
		try
		{
			let {_id,balance} = req.query
			let user = await User.updateOne({_id},{$set:{balance}});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error : 'Recurso no encontrado'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllOrdersUser : async (req,res)=>{
		try
		{
			let {user,date} = req.query;
			let orders = await Order.find({user});
			if(orders.length>0) res.status(200).send(orders)
			res.status(204).send()

		}
		catch(err)
		{
			res.status(500).send({err})
		}
	},
	queryUser : async (req,res)=>{
		try
		{
			let {ci} = req.query;
			let users = await User.find({ci},{password:false});
			if(users.length>0) return res.status(200).send(users)
			res.status(404).send({error:'Usuario no existe'})

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findUser : async (req,res)=>{
		try
		{
			let {_id} = req.query;
			let user = await User.findOne({_id},{password:false});
			if(user) return res.status(200).send(user)
			res.status(404).send({error:'Usuario no existe'})

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	createSeller : async (req,res)=>{
		try
		{
			let {names,lastNames,email,password,school,ci} = req.body;

			let user = await User.findOne({email},{email:true});

			if(user) return res.status(401).send({error : 'correo ya existe!'});

			let newUser = new User({
				email,
				password,
				names,
				lastNames,
				ci,
				school,
				rol : 'seller'
			})

			await newUser.save();

			res.status(201).send({
				_id : newUser._id,
				names : newUser.names,
				lastNames : newUser.lastNames			
			})

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllSeller : async (req,res)=>{
		try
		{
			let {school} = req.query;
			let users = await User.find({school,rol:'seller'},{_id:true,names:true,lastNames:true,avatar:true,ci:true});
			if(users.length>0) return res.status(200).send(users);
			res.status(204).send();
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	queryOrder : async (req,res)=>{
		try
		{
			let {vouched} = req.query;
			let orders = await Order.findOne({vouched});
			if(!orders) return res.status(404).send({error:'Pedido no encontrado'});
			res.status(200).send(orders);
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	packOffOrder : async (req,res)=>{
		try
		{
			let {vouched,date,products,school} = req.body;

			let order = await Order.updateOne({vouched},{$set:{status:true}});

			let shopping = new Shopping({
				vouched,
				date,
				school,
				products : Array.from(products)
			})

			await shopping.save();

			if(order.ok>0 && order.n>0) return res.status(204).send();
			res.status(404).send({error:'Orden no encontrada'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	deleteProduct : async (req,res)=>{
		try
		{
			let {category,product} = req.query;
			let result = await Category.updateOne({name:category},{$pull:{products:{"_id":product} }});
			if(result.ok>0 && result.n>0) return res.status(204).send();
			res.status(404).send({error:'Recurso no encontrado'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	saveShopping : async (req,res)=>{
		try
		{
			let {products,date,school} = req.body;

			let shopping = new Shopping({
				vouched :  randomatic('0',6),
				date,
				products,
				school
			})

			await shopping.save();

			res.status(201).send({message:'compra completada'})
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	changeVip : async(req,res)=>{
		try
		{
			let {_id,vip} = req.query;
			let user = await User.updateOne({_id},{$set:{vip}});
			if(user.ok>0 && user.n>0) return res.status(204).send();
			res.status(404).send({error:'Usuario no existe'});

		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllShopping : async (req,res)=>{
		try
		{
			let {school,initDate,endDate} = req.query;
			initDate = new Date(initDate);
			endDate = new Date(endDate);
			let shopping =  await Shopping.find({school,
												date:{
													$gte : initDate,
													$lte : endDate
												}}).sort({date:-1})
			
			if(shopping.length>0) return res.status(200).send(shopping);
			res.status(204).send();
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	queryShoppingDay : async(req,res)=>{
		try
		{
			let {school,date} = req.query;			
			date = new Date(date)
			let orders =  await Order.find({school,date}).sort({date:-1})
			if(orders.length>0) return res.status(200).send(orders);
			res.status(204).send();
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	createVoucherPayment : async (req,res)=>{
		try
		{
			let image = await cloudinary.v2.uploader.upload(req.file.path);
			const newVoucher = new Voucher({
				user : req.body.user,
				school : req.body.school,
				image : image.secure_url
			})

			const voucher = await newVoucher.save();
			res.status(201).send({
				_id: voucher._id,
				image : voucher.image
			})
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllMyVoucher : async (req,res)=>{
		try
		{
			let voucher = await Voucher.find({user:req.user});
			if(voucher.length>0) return res.status(200).send(voucher);
			res.status(204).send()
		}
		catch(err)
		{
			res.status(500).send({error:'error en el servidor'})
		}
	},
	totalSales : async (req,res)=>{
		try
		{
			let shopping =  await Shopping.aggregate([{"$unwind":"$products"},{"$unwind":"$products.name"},{"$group":{"_id":"$products.name","quantity":{"$sum":"$products.quantity"}}}])
			if(shopping.length>0) return res.status(200).send(shopping);
			res.status(404).send({error:'no se encuentran compras'});
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	findAllVoucher : async (req,res)=>{
		try
		{
			let voucher = await Voucher.find({school:req.query.school,status:false});
			await User.populate([voucher],{path:'user',select:["names","lastNames","email","ci","balance"]});
			if(voucher.length>0) return res.status(200).send(voucher);
			res.status(204).send();
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	paymentVoucher : async (req,res)=>{
		try
		{	
			let {_id,user,balance} = req.query;
			let voucher = await Voucher.updateOne({_id},{$set:{status:true}});
			if(!voucher.ok>0 && !voucher.n>0) return res.status(404).send({error:'Recurso no encontrado'});
			let result = await User.updateOne({_id:user},{$set:{balance}});
			if(result.ok>0 && result.n>0) return res.status(201).send({message:'Exitoso'});
			res.status(404).send({error:'Recurso no encontrado'});	
			
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}	
	},
	editCi: async (req,res)=>{
		try
		{
			let {_id,ci} = req.query;
			let user = await User.updateOne({_id},{$set:{ci}});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error:'Usuario no existe'});	
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	editEmail: async (req,res)=>{
		try
		{
			let {_id,email} = req.query;
			let user = await User.updateOne({_id},{$set:{email}});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error:'Usuario no existe'});	
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	editNames: async (req,res)=>{
		try
		{
			let {_id,names,lastNames} = req.query;
			let user = await User.updateOne({_id},{$set:{names,lastNames}});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error:'Usuario no existe'});	
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},
	editPassword : async (req,res)=>{
		try
		{
			let {_id,password} = req.query;
			let user = await User.updateOne({_id},{$set:{password : bcrypt.hashSync(password.toLocaleLowerCase()) }});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error:'Usuario no existe'});	
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}	
	},
	editPhone: async (req,res)=>{
		try
		{
			let {_id,countryCode,phone} = req.query;
			let user = await User.updateOne({_id},{$set:{countryCode,phone}});
			if(user.ok>0 && user.n>0) return res.status(201).send({message:'success'});
			res.status(404).send({error:'Usuario no existe'});	
		}
		catch(err)
		{
			res.status(500).send({error:'Error en el servidor'})
		}
	},


}