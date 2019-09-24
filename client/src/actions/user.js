const action_login = (data)=>{
	return {
		type :'LOGIN',
		data
	}
}

const action_signup = (data)=>{
	return {
		type :'SIGNUP',
		data
	}
}

const action_logout = ()=>{
	return {
		type : 'LOGOUT'
	}
}

const action_balance = (balance)=>{
	return {
		type : 'ADD_BALANCE',
		balance
	}
}

export {
	action_login,
	action_logout,
	action_signup,
	action_balance
}