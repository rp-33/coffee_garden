import
{
	action_addCart,
	action_removeCart,
	action_removeShopping,
	action_incrProduct
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
		case action_incrProduct().type:
			return {
                ...state,
                shopping : [
                    ...state.shopping.slice(0, action.payload.position),// Copia el objeto antes de modificarlo
                    Object.assign({}, state.shopping[action.payload.position], {
                    	quantity : state.shopping[action.payload.position].quantity + action.payload.quantity 
                    }),
                    ...state.shopping.slice(action.payload.position + 1)
                ]
           	}
		default :
			return state;
	}

}