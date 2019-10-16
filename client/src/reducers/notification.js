import {
	action_toast
} from '../actions/notification';

const initialState = {
	open : false,
	title : '',
	variant : ''
}

export default (state = initialState, action) =>{
	switch (action.type){
		case action_toast().type:
			return action.payload
		default :
			return state;
	}

}