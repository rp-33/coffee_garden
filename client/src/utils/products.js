const orderProducts = (products,date)=>{
	let data = [];
	for(let i=0;i<products.length;i++){
		if(products[i].date == date){
			data.push(products[i]);
		}
	}

	return data;
}

const searchProducts = (products,date)=>{
	for(let i=0;i<products.length;i++){
		if(products[i].date == date) return date;
	}
	return null;
}

const totalPrice = (products)=>{
	let total = 0;
	products.forEach((item,i)=>{
		total = total + item.quantity * item.price
	});

	return total
}

export {
	orderProducts,
	searchProducts,
	totalPrice
}