import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import {
	editPhone
} from '../../services/api';

class EditPhone extends Component{
	constructor(props){
		super(props);
		this.state = {
            countryCode : this.props.countryCode,
			phone : this.props.phone,
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
            let {countryCode,phone} = this.state;
			let {status,data} = await editPhone(this.props.user,countryCode,phone);
			if(status === 201)
			{
                this.props.handleSuccess(countryCode,phone)
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
				<h2 className="title">Editar telefono</h2>
				<BarMessage 
					title = {this.state.error}
				/>
                <div className="ctn-input">
					<select
					    onChange = {(event)=>this.setState({countryCode:event.target.value})}
						className="select"
          				value={this.state.countryCode}
        			>
        				<option value="58">58</option>
        				<option value="57">57</option>
        			</select>
				</div>
				<div className="ctn-input">
					<input 
						type="number" 
						placeholder="Numero telefonico" 
						required
						value = {this.state.phone} 
						name="phone"
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

export default EditPhone;