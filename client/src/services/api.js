import axios from 'axios';
import {getStore} from './store';

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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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

const saveOrder = (user,name,image,price,quantity)=>{
	return axios({
		method : 'post',
		url : '/app/saveOrder',
		data:{
			user,
			name,
			image,
			price,
			quantity
		},
		headers: {'Authorization': "bearer " + getStore().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}//desarrollo

const findBalance = (user)=>{
	return axios({
		method : 'get',
		url : '/app/findBalance',
		params :{
			user
		},
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllRepresented = ()=>{
	return axios({
		method : 'get',
		url : '/app/findAllRepresented',
		headers: {'Authorization': "bearer " + getStore().token}
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
		headers: {'Authorization': "bearer " + getStore().token}
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
	deleteRepresented
}
