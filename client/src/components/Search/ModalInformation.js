import React from 'react';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

const ModalInformation = ({open,handleClose})=>{
	return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<div className="modal-information">
				<Paper className="form-control">
					<div className="icon-close" onClick = {()=>handleClose(false)}>
                    	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               		</div>
               	</Paper>

			</div>
		</Slide>
	)

}

ModalInformation.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired
}

export default ModalInformation;