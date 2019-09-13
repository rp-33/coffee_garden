const getStore = ()=>{
	const storage = JSON.parse(localStorage.getItem('users'));
	return storage;
}

const setStore = (data)=>{
	window.localStorage.setItem('users', JSON.stringify(data));
}

const deleteStore = ()=>{
	window.localStorage.clear();
}

export {
	getStore,
	setStore,
	deleteStore
}