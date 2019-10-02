import {
	action_toast
} from '../actions/notification';

const initialState = {
	toast : false
}

export default (state = initialState, action) =>{
	switch (action.type){
		case action_toast().type:
			return action.bool;
		default :
			return state;
	}

}