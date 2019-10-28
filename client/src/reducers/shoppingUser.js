import {
    action_addShoppingUser,
    action_removeShoppingUser
} from '../actions/shoppingUser';

const initialState = {
    _id : '',
    names : '',
    lastNames : '',
    ci : ''
}

export default (state = initialState,action) =>{
    switch(action.type){
        case action_addShoppingUser().type:
            return {
                _id : action.payload._id,
                names : action.payload.names,
                lastNames : action.payload.lastNames,
                ci : action.payload.ci
            }
        case action_removeShoppingUser().type:
            return initialState;
        default : 
            return state; 
    }
}