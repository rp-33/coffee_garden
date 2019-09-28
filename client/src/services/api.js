import axios from 'axios';
import {getStoreUser} from './store';

const login = (email,password)=>{

	return axios({
		method:'post',
		url:'/app/login',
		data: {email,password}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const signup = (email,names,lastNames,codeCi,ci,phone,countryCode,school,password)=>{

	return axios({
		method:'post',
		url:'/app/signup',
		data: {
			email,
			names,
			lastNames,
			codeCi,
			ci,
			phone,
			countryCode,
			school,
			password
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const createSchool = (name,file)=>{

	let formData = new FormData();
	formData.append('name',name);
	formData.append('file',file);
	return axios({
		method:'post',
		url : '/app/createSchool',
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllSchool = ()=>{

	return axios({
		method:'get',
		url :'/app/findAllSchool'
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const deleteSchool = (_id) =>{

	return axios({
		method :'delete',
		url : '/app/deleteSchool',
		params : {
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const createCategory = (name,school)=>{

	return axios({
		method :'post',
		url : '/app/createCategory',
		data : {
			name,
			school
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const findAllCategory = (school) =>{

	return axios({
		method :'get',
		url : '/app/findAllCategory',
		params : {
			school
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const deleteCategory = (_id)=>{
	return axios({
		method : 'delete',
		url : '/app/deleteCategory',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const editCategory = (_id,name)=>{
	return axios({
		method : 'put',
		url : '/app/editCategory',
		params :{
			_id,
			name
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllProducts = (school) =>{

	return axios({
		method :'get',
		url : '/app/findAllProducts',
		params : {
			school
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const createProduct = (_id,name,price,file)=>{

	let formData = new FormData();
	formData.append('_id',_id);
	formData.append('name',name);
	formData.append('price',price);
	formData.append('file',file);
	return axios({
		method:'post',
		url : '/app/createProduct',
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const editNameSchool = (_id,name)=>{
	return axios({
		method : 'put',
		url : '/app/editNameSchool',
		params :{
			_id,
			name
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}


const editAvatarSchool = (_id,file)=>{
	let formData = new FormData();
	formData.append('_id',_id);
	formData.append('file',file);
	return axios({
		method : 'put',
		url : '/app/editAvatarSchool',
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const saveOrder = (user,products,total,date)=>{
	return axios({
		method : 'post',
		url : '/app/saveOrder',
		data:{
			user,
			products,
			total,
			date
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findBalance = (user)=>{
	return axios({
		method : 'get',
		url : '/app/findBalance',
		params :{
			user
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const saveRepresented = (school,names,lastNames,email,password)=>{
	return axios({
		method : 'post',
		url : '/app/saveRepresented',
		data:{
			school,
			names,
			lastNames,
			email,
			password
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllRepresented = ()=>{
	return axios({
		method : 'get',
		url : '/app/findAllRepresented',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const deleteRepresented = (_id)=>{
	return axios({
		method : 'delete',
		url : '/app/deleteRepresented',
		params : {
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllOrders = (user,date)=>{
	return axios({
		method : 'get',
		url : '/app/findAllOrders',
		params :{
			user,
			date
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const findAllRepresentative = (school)=>{
		return axios({
		method : 'get',
		url : '/app/findAllRepresentative',
		params :{
			school
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const addBalance = (_id,balance)=>{
	return axios({
		method : 'put',
		url : '/app/addBalance',
		params :{
			_id,
			balance
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllOrdersUser = (user)=>{
	return axios({
		method : 'get',
		url : '/app/findAllOrdersUser',
		params :{
			user
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const queryUser = (ci)=>{
	return axios({
		method : 'get',
		url : '/app/queryUser',
		params :{
			ci
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const createSeller = (school,names,lastNames,ci,email,password)=>{
	return axios({
		method : 'post',
		url : '/app/createSeller',
		data :{
			school,
			names,
			lastNames,
			ci,
			email,
			password
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllSeller = (school)=>{
	return axios({
		method : 'get',
		url : '/app/findAllSeller',
		params :{
			school
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})	
}

const deleteSeller = (_id)=>{
	return axios({
		method :'delete',
		url : '/app/deleteSeller',
		params : {
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const queryOrder = (vouched)=>{
	return axios({
		method : 'get',
		url : '/app/queryOrder',
		params :{
			vouched
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const packOffOrder = (vouched)=>{
	return axios({
		method : 'put',
		url : '/app/packOffOrder',
		params :{
			vouched
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export {
	login,
	createSchool,
	findAllSchool,
	deleteSchool,
	createCategory,
	findAllCategory,
	deleteCategory,
	editCategory,
	findAllProducts,
	createProduct,
	editNameSchool,
	editAvatarSchool,
	signup,
	saveOrder,
	findBalance,
	saveRepresented,
	findAllRepresented,
	deleteRepresented,
	findAllOrders,
	findAllRepresentative,
	addBalance,
	findAllOrdersUser,
	queryUser,
	createSeller,
	findAllSeller,
	deleteSeller,
	queryOrder,
	packOffOrder
}
