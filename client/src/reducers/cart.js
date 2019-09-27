import
{
	action_addCart,
	action_removeCart,
	action_removeShopping
} from '../actions/cart';

const initialState = {
	shopping : []
}

export default (state = initialState, action) =>{

	switch (action.type){
		case action_addCart().type:
			return Object.assign({},state,{
				shopping : state.shopping.concat(action.payload)
			})
		case action_removeCart().type:
			return Object.assign({},state,{
				shopping : state.shopping.filter((item,i)=>{
					return item.image != action.image
				})
			})
		case action_removeShopping().type:
			return Object.assign({},state,{
				shopping : state.shopping.filter((item,i)=>{
					return item.date != action.date
				})
			})
		default :
			return state;
	}

}