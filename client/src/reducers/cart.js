import
{
	action_addCart
} from '../actions/cart';

const initialState = {
	shopping : []
}

export default (state = initialState, action) =>{

	switch (action.type){
		case action_addCart().type:
			return action.payload;
		default :
			return state;
	}

}