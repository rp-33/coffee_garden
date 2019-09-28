import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

const ListProduct = ({list,selectProduct})=>{
	return(
		<Fragment>
			{list.map((item,i)=>
				<div key={i} className="product" onClick = {()=>selectProduct(item)}>
					<img src={item.image} alt={item.name} />
				</div>
			)}
		</Fragment>
	)
}

ListProduct.propTypes = {
	list:PropTypes.array.isRequired,
	selectProduct :  PropTypes.func.isRequired
}

export default ListProduct;