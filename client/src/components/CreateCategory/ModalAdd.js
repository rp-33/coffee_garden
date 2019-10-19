import React from 'react';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const ModalAdd = ({open,handleClose,value,isLoading,handleChange,handleSave})=>{

	return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<div className="modal-add">
				<Paper className="form-control">
					<div className="icon-close" onClick = {()=>handleClose(false)}>
                    	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               		</div>
         			<h2 style={{textAlign:'center',color:'#e44a4c'}}>Agregar</h2>

         				<div className="ctn-input">
							<input 
							type="text" 
							placeholder="Ejemplo : bebidas" 
							value = {value}
							name="names"
							onChange = {(event)=>handleChange(event)}
							/>
						</div>
						{value !== '' &&
						<div className="ctn-btn">	
							{isLoading	
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:				
								<Fab onClick = {()=>handleSave()} type="button" variant="extended" size="large" color="secondary" className="secondary">
        							Guardar
     							</Fab>     
     						}						
     					</div>
     					}
         		</Paper>
			</div>
		</Slide>
	)

}

ModalAdd.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
	value : PropTypes.string.isRequired,
	isLoading : PropTypes.bool.isRequired,
	handleChange : PropTypes.func.isRequired,
	handleSave : PropTypes.func.isRequired
}

export default ModalAdd;