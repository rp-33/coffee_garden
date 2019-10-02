import React,{Fragment} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';


const ListProduct = ({list,handleDelete})=>{
	return(
		<Fragment>
			{list.map((item,i)=>
				<div key={i} className="product">
					<img src={item.image} alt={item.name} />
					<div className="icon-close" onClick = {()=>handleDelete(i)}>
                        <CancelIcon fontSize="small" style={{color:'#e44a4c'}}/>
                    </div>
					<div className="quantity">{item.quantity}</div>
				</div>
			)}
		</Fragment>
	)
}

ListProduct.propTypes = {
	list:PropTypes.array.isRequired,
	handleDelete : PropTypes.func.isRequired
}

export default ListProduct;