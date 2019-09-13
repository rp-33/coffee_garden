const action_login = (data)=>{
	return {
		type :'LOGIN',
		data
	}
}

const action_logout = ()=>{
	return {
		type : 'LOGOUT'
	}
}

export {
	action_login,
	action_logout
}