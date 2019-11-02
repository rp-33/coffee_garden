import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

const ModalInf = ({open,voucher,handleClose})=>{
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
         			<div className="ctn-input">
         				{voucher.status
         				?
         					<div>solicitud procesada</div>
         				:
         					<div>solicitud en espera</div>
         				}
         			</div>
					<div className="ctn-input">
						<div>{voucher.bank}</div>
         			</div>
         		</Paper>
         	</div>
         </Slide>
	)
}

ModalInf.propTypes = {
	open : PropTypes.func.isRequired,
	voucher : PropTypes.shape({
		image: PropTypes.string,
		status : PropTypes.bool,
		bank : PropTypes.string
	}),
	handleClose : PropTypes.func.isRequired
}

export default ModalInf;