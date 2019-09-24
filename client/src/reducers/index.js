import {createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import user from './user';
import cart from './cart';

export default createStore(combineReducers({
	user,
	cart
}),applyMiddleware(thunk,promise))