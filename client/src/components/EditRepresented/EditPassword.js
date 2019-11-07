import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import {editPassword} from '../../services/api';
import PropTypes from 'prop-types';

class EditPassword extends Component{
	constructor(props){
		super(props);
		this.state = {
			password : '',
			loading : false,
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
				loading:true,
				error:''
			})
			let {status,data} = await editPassword(this.props.user,this.state.password);
			if(status === 201)
			{
				this.props.handleSuccess()
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
		catch(err){
			this.setState({
				error:'Error'
			})
		}
		finally
		{
			this.setState({
				loading :false
			})
		}
	}

	render(){
		let {handleBack} = this.props;
		return(
			<form onSubmit = {this.handleSubmit.bind(this)}>
				<h2 className="title">Editar contraseña</h2>
				<BarMessage 
					title = {this.state.error}
				/>
				<div className="ctn-input">
					<input 
						type="password" 
						placeholder="Contraseña" 
						required
						minlength="5"
						value = {this.state.password} 
						name="password"
						onChange = {this.handleChange.bind(this)}
					/>
				</div>
				<div className="ctn-btn">
					{this.state.loading
					?
						<div className="ctn-loading">
							<CircularProgress color="secondary"/>
						</div>
					:
						<Fab type="submit" variant="extended" size="large" color="secondary" className="secondary">
						    guardar
     					</Fab>
     				}
     			</div>
     			<div className="ctn-btn">
     				<Button onClick = {()=>handleBack('none')}>cancelar</Button>
     			</div>
			</form>
		)
	}
}

EditPassword.propTypes = {
	user : PropTypes.string.isRequired,
	handleBack : PropTypes.func.isRequired,
	handleSuccess : PropTypes.func.isRequired,
}

export default EditPassword;