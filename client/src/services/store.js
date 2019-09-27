const getStoreUser = ()=>{
	const storage = JSON.parse(localStorage.getItem('users'));
	return storage;
}

const setStoreUser = (data)=>{
	window.localStorage.setItem('users', JSON.stringify(data));
}

const deleteStore = ()=>{
	window.localStorage.clear();
}

export {
	getStoreUser,
	setStoreUser,
	deleteStore
}