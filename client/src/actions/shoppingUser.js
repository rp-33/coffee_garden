const action_addShoppingUser = (payload)=>{
	return{
		type : 'ADD_SHOPPING_USER',
		payload
	}
}

const action_removeShoppingUser = ()=>{
	return{
		type : 'remove_SHOPPING_USER'
	}
}

export {
    action_addShoppingUser,
    action_removeShoppingUser
}