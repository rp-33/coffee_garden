import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import {
	editCi
} from '../../services/api';

class EditCi extends Component{
	constructor(props){
		super(props);
		this.state = {
			ci : props.value,
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
			let {status,data} = await editCi(this.props.user,this.state.ci);
			if(status === 201)
			{
				this.props.handleSuccess(this.state.ci)
			}
			else if(status === 404)
			{
				this.setState({
					error:data.error
				})
			}
		}
		catch(err){
			this.props.handleError();
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
				<h2 className="title">Editar cedula</h2>
				{this.state.error &&
						<BarMessage 
							title = {this.state.error}
						/>
					}
				<div className="ctn-input">
					<input 
						type="number" 
						placeholder="cedula de identidad" 
						required
						value = {this.state.ci} 
						name="ci"
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

export default EditCi;