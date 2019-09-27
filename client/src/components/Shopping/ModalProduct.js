import React from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

const ModalProduct = ({open,product,handleClose})=>{
	return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         	<div className="modal-add-product">
         		<Paper className="form-control">
                    <div className="icon-close" onClick = {()=>handleClose(false)}>
                        <CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    </div>
         			<h2 style={{color:'#e2474b',textAlign:'center'}}>{product.name}</h2>
         			<div className="ctn-img">
         				<img src={product.image} alt={product.name}/>
         				<div className="price">{product.price} BSS</div>
         			</div>

                    <div className="ctn-input">
                        <div className="input">
                        	<span style={{fontWeight:'bold'}}>cantidad {product.quantity}</span>
                        </div>
                   </div>
                     <div className="ctn-input">
                        <div className="input">
                        	<span style={{fontWeight:'bold'}}>total {product.quantity * product.price} BSS</span>
                        </div>
                   </div>
         		</Paper>
         	</div>
        </Slide>
	)

}

ModalProduct.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose :  PropTypes.func.isRequired,
	product : PropTypes.shape({
		image : PropTypes.string,
		name : PropTypes.string,
		quantity : PropTypes.number
	}).isRequired
} 

export default ModalProduct;