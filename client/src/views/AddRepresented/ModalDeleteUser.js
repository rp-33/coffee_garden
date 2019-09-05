import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ModalDeleteUser = ({open,handleClose})=>{
	return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         	<div className="modal-delete">
         		<div className="ctn">
         			<h2>Eliminar usuario</h2>
         			<p>¿Deseas eliminar a name lastName?</p>
         			<div style={{textAlign:'right'}}>
         				<Button color="secondary" onClick = {()=>handleClose(false)}>cancelar</Button>
         				<Button color="primary">Aceptar</Button>
         			</div>
        		</div>     		
        	</div>
        </Slide>
	)
}

ModalDeleteUser.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired
}

export default ModalDeleteUser;