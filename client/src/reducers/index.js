import {createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import user from './user';
import cart from './cart';
import shoppingUser from './shoppingUser';
import notification from './notification';

export default createStore(combineReducers({
	user,
	cart,
	shoppingUser,
	notification
}),applyMiddleware(thunk,promise))