import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarMessage from '../../presentation/BarMessage'
import {saveRepresented} from '../../services/api';
import PropTypes from 'prop-types';

class ModalAddUser extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			names : '',
			lastNames : '',
			email:'',
			password:'',
			error : ''	
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handleSubmit(event){
		try
		{
			event.preventDefault();
			this.setState({
				isLoading:true,
				error:''
			});
			let {names,lastNames,email,password} = this.state;
			let {status,data} = await saveRepresented(this.props.school,names,lastNames,email,password);
			if(status === 201)
			{
				this.props.handleSave(data);
			}
			else
			{
				this.setState({
					error :  data.error
				})
			}
		}
		catch(err)
		{
			this.setState({
				error : 'Error'
			})
		}
		finally
		{
			this.setState({
				isLoading:false
			})
		}
	}


	render(){

		let {open,handleClose} = this.props;

		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         		<div className="modal-add-user">
         			<Paper className="form-control">
         				<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         				<h2 style={{textAlign:'center'}}>Agregar Representado</h2>
         				<form autoComplete="off" onSubmit = {this.handleSubmit.bind(this)}>
         					<BarMessage 
								title = {this.state.error}
							/>
         					<div className="ctn-input">
								<input 
								type="text" 
								placeholder="Nombres" 
								required 
								value = {this.state.names}
								name="names"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							<div className="ctn-input">
								<input 
								type="text" 
								placeholder="Apellidos" 
								required 
								value = {this.state.lastNames}
								name="lastNames"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							<div className="ctn-input">
								<input 
								type="email" 
								placeholder="Correo electronico" 
								required 
								value = {this.state.email}
								name="email"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							<div className="ctn-input">
								<input 
								type="password" 
								placeholder="Contraseña" 
								minLength="5"
								required
								value = {this.state.password}
								name="password"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							<div className="ctn-btn">
								{this.state.isLoading
								?
									<div className="ctn-loading">
										<CircularProgress color="secondary"/>
									</div>
								:
									<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        								guardar
     								</Fab>
     							}
							</div>
         				</form>
         			</Paper>
         		</div>
         	</Slide>
		)
	}

}

ModalAddUser.propTypes = {
	school : PropTypes.string.isRequired,
	open : PropTypes.bool.isRequired,
	handleSave : PropTypes.func.isRequired,
	handleClose : PropTypes.func.isRequired
}

export default ModalAddUser;