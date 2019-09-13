import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

const ListProduct = ({list})=>{
	return(
		<Fragment>
			{list.map((item,i)=>
				<div key={i} className="product">
					<img src={item.image} alt={item.name} />
				</div>
			)}
		</Fragment>
	)
}

ListProduct.propTypes = {
	list:PropTypes.array.isRequired
}

export default ListProduct;