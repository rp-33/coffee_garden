import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';


const ModalVoucher = ({open,handleClose,voucher,handleBalance})=>{
	return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         	<div className="modal-inf">
         		<Paper className="form-control">
         			<div className="icon-close" onClick = {()=>handleClose(false)}>
                       	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                   	</div>
                   	<h2 style={{color:'#e2474b',textAlign:'center'}}>Comprobante de pago</h2>        				
                   	<div className="ctn-img">
         				<img src={voucher.image} alt="image"/>
         			</div>

         			 <div className="ctn-btn">
                        <Fab 
                        	onClick = {()=>handleBalance()}
                        	variant="extended" 
                        	size="large"
                        	color="secondary" 
                        	className="secondary" 
                        >
                            recargar saldo
                        </Fab>
                    </div>

         		</Paper>
         	</div>
        </Slide>
	)
}


export default ModalVoucher;