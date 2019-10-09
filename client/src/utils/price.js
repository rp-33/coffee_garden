const priceOrder = (products)=>{
	let price = 0;
	for(let i=0;i<products.length;i++){
		price = products[i].price * products[i].quantity;
	}

	return price;
}

export {
	priceOrder
}
