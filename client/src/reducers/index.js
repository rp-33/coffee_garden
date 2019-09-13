import {createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import user from './user';

export default createStore(combineReducers({
	user
}),applyMiddleware(thunk,promise))