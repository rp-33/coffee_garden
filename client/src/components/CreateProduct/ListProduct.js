import React,{Fragment} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

const ListProduct = ({list,handleDelete,position,category})=>{
	return(
		<Fragment>
			{list.map((item,i)=>
				<div key={i} className="product">
                    <CancelIcon 
                    	onClick = {()=>handleDelete(item,position,category)}
                    	fontSize="small" 
                    	className="icon-close"
                    />
					<img src={item.image} alt={item.name} />
				</div>
			)}
		</Fragment>
	)
}

ListProduct.propTypes = {
	list:PropTypes.array.isRequired,
	handleDelete :  PropTypes.func.isRequired,
	position : PropTypes.number.isRequired,
	category : PropTypes.string.isRequired
}

export default ListProduct;