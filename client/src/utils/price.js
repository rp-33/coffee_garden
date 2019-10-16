const priceOrder = (products)=>{
	console.log(products)
	let price = 0;
	for(let i=0;i<products.length;i++){
		price = price + products[i].price * products[i].quantity;
	}

	return price;
}

export {
	priceOrder
}
