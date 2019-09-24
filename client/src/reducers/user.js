import
{
	action_login,
	action_logout,
	action_signup,
	action_balance
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
	avatar : null,
	rol : '',
	balance : 0,
	routes : '',
	representative : '',
	school : ''
}

const initialState = getStore() || user;

export default (state = initialState, action) =>{

	switch (action.type){
		case action_login().type:
			setStore(action.data);
			return action.data;
		case action_signup().type:
			setStore(action.data);
			return action.data;
		case action_logout().type:
			deleteStore();
			return user;
		case action_balance().type:
			return Object.assign({}, state, {
       			balance : action.balance
      		})
		default :
			return state;
	}

}