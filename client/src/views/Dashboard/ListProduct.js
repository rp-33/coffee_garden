import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

const ListProduct = ({list,handleOpen})=>{
	return(
		<Fragment>
			{list.map((item,i)=>
				<div key={i} className="product" onClick = {()=>handleOpen(true)}>
					<img src="https://www.recetasderechupete.com/wp-content/uploads/2016/03/empanada_lomo.jpg" alt="product" />
				</div>
			)}
		</Fragment>
	)
}

ListProduct.propTypes = {
	list:PropTypes.array.isRequired,
	handleOpen : PropTypes.func.isRequired
}

export default ListProduct;