import React from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

const ModalProduct = ({open,handleClose,quantity,handleAddQuantity,handleDecreaseQuantity})=>{

	return(
	<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         	<div className="modal-add-product">
         		<Paper className="form-control">
                                <div className="icon-close" onClick = {()=>handleClose(false)}>
                                        <CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                                </div>
         			<h2 style={{color:'#e2474b',textAlign:'center'}}>Empanada</h2>
         			<div className="ctn-img">
         				<img src="https://www.recetasderechupete.com/wp-content/uploads/2016/03/empanada_lomo.jpg" alt="product"/>
         			</div>

                                <div className="ctn-input">
                                        <IconButton aria-label="back" style={{color:'#e2474b'}}><ArrowLeftIcon fontSize="large" /></IconButton>
                                        <div className="input">mechada</div>
                                        <IconButton aria-label="next" style={{color:'#e2474b'}}><ArrowRightIcon fontSize="large" /></IconButton>  
                                </div>
                                <div className="ctn-input">
                                        <IconButton disabled = {quantity==1}  aria-label="back" style={{color:'#e2474b'}} onClick = {()=>handleDecreaseQuantity()}><ArrowLeftIcon fontSize="large" /></IconButton>
                                        <div className="input">{quantity}</div>
                                        <IconButton aria-label="next" style={{color:'#e2474b'}} onClick = {()=>handleAddQuantity()}><ArrowRightIcon fontSize="large" /></IconButton>  
                                </div>
                                <div className="ctn-btn">
                                        <Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary" style={{marginTop:'20px'}}>
                                                Agregar
                                        </Fab>
                                </div>
         		</Paper>
         	</div>
        </Slide>
	)

}

ModalProduct.propTypes = {
        open : PropTypes.bool.isRequired,
        handleClose : PropTypes.func.isRequired,
        quantity : PropTypes.number.isRequired,
        handleAddQuantity : PropTypes.func.isRequired,
        handleDecreaseQuantity : PropTypes.func.isRequired
}

export default ModalProduct;