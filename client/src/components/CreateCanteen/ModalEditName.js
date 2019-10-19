import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarMessage from '../../presentation/BarMessage';
import PropTypes from 'prop-types';
import {editNameSchool} from '../../services/api';


class ModalEditName extends Component{
	constructor(props){
		super(props);
		this.state = {
			input : props.item.name,
			name : props.item.name,
			_id : props.item._id,
			isLoading :false,
			error:''
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handleSubmit(){
		try
		{
			this.setState({
				isLoading:true,
				error:''
			});
			let {_id,input} = this.state;
			let {status,data} = await editNameSchool(_id,input);
			if(status === 201)
			{
				this.props.handleSuccess(_id,input);
			}else if(status === 204)
			{
				this.setState({
					error:'Nombre ya existe'
				})
			}
			else if(status === 500)
			{
				this.setState({
					error:'Error en el servidor'
				})
			}
			else
			{
				this.setState({
					error:data.error
				})
			}

		}
		catch(err)
		{
			this.setState({
				error:'Error'
			})
		}
		finally{
			this.setState({
				isLoading:false
			})
		}
	}


	render(){

		let {open,handleClose} = this.props;

		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
				<div className="modal-edit-name">
					<Paper className="form-control">
						<div className="icon-close" onClick = {()=>handleClose(false)}>
                    		<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               			</div>
         				<h2 style={{textAlign:'center',color:'#e44a4c'}}>Editar</h2>
					 	<BarMessage 
							title = {this.state.error}
						/>
         				<div className="ctn-input">
							<input 
							type="text" 
							placeholder="Nombre cantina" 
							value = {this.state.input}
							name="input"
							onChange = {this.handleChange.bind(this)}
							/>
						</div>
						{(this.state.input != '' && this.state.input !=this.state.name) &&
						<div className="ctn-btn">	
							{this.state.isLoading	
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:				
								<Fab  
									type="button" 
									variant="extended" 
									color="secondary" 
									className="secondary"
									onClick = {this.handleSubmit.bind(this)}
								>
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
}

ModalEditName.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
	handleSuccess : PropTypes.func.isRequired,
	item : PropTypes.object.isRequired
}

export default ModalEditName;