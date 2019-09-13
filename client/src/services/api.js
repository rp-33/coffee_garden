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
	createProduct
}
