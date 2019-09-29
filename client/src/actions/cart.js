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

const action_incrProduct = (payload)=>{
	return{
		type : 	'INCREASE_PRODUCT',
		payload
	}
}

export {
	action_addCart,
	action_removeCart,
	action_removeShopping,
	action_incrProduct
}