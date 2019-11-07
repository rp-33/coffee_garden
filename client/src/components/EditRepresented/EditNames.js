import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import {editNames} from '../../services/api';
import PropTypes from 'prop-types';

class EditNames extends Component{
	constructor(props){
		super(props);
		this.state = {
			names : props.names,
			lastNames : props.lastNames,
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
			});
			let {names,lastNames} = this.state;
			let {status,data} = await editNames(this.props.user,names,lastNames);
			if(status === 201)
			{
				this.props.handleSuccess(names,lastNames)
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
				<h2 className="title">Editar nombre y apellido</h2>			
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

EditNames.propTypes = {
	names : PropTypes.string.isRequired,
	lastNames : PropTypes.string.isRequired,	
	user : PropTypes.string.isRequired,
	handleBack : PropTypes.func.isRequired,
	handleSuccess : PropTypes.func.isRequired,
}

export default EditNames;