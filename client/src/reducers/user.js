import
{
	action_login,
	action_logout,
} from '../actions/user';

import {
	getStore,
	setStore,
	deleteStore
} from '../services/store';

const user = {
	isAuthenticated : false,
	_id : '',
	token : '',
	names : '',
	lastNames : '',
	email : '',
	rol : '',
	balance : null,
	routes : ''
}

const initialState = getStore() || user;

export default (state = initialState, action) =>{

	switch (action.type){
		case action_login().type:
			setStore(action.data);
			return action.data;
		case action_logout().type:
			deleteStore();
			return user;
		default :
			return state;
	}

}