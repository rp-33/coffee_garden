'use strict';

import validate from 'validate.js';

const validateCompare = (value1,value2,minimum)=>{
	
	if((validate({ value1,value2 }, { value2: { equality: "value1"}}) === undefined) && (validate.single(value1,{length:{minimum},presence:true})===undefined))
	{
		return true;
	}
	else
	{
		return false
	}
}//compara 2 campos si son iguales


export {validateCompare};