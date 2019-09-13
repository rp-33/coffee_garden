import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const ModalDelete = ({open,handleClose,name,handleDelete,isLoading})=>{
	return(
	<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         	<div className="modal-delete">
         		<div className="ctn">
                                {isLoading
                                ?
                                <div className="ctn-loading">
                                        <CircularProgress color="secondary"/>
                                </div>
                                :
                                <div>
         			    <h2>Eliminar cantina</h2>
         			    <p>¿Deseas eliminar {name}?</p>
         			    <div style={{textAlign:'right'}}>
         				<Button color="secondary" onClick = {()=>handleClose(false)}>cancelar</Button>
         				<Button color="primary" onClick = {()=>handleDelete()}>Aceptar</Button>
         			    </div>
                                </div>

                                }
        		</div>     		
        	</div>
        </Slide>
	)
}

ModalDelete.propTypes = {
        name : PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
        handleDelete : PropTypes.func.isRequired,
        isLoading : PropTypes.bool.isRequired
}

export default ModalDelete;