const action_addCart = (payload)=>{
	return{
		type : 'ADD_CART',
		payload
	}
}

const action_removeCart = (image)=>{
	return{
		type : 'REMOVE_CART',
		image
	}
}

const action_removeShopping = (date)=>{
	return{
		type : 'REMOVE_SHOPPING',
		date
	}
}

export {
	action_addCart,
	action_removeCart,
	action_removeShopping
}