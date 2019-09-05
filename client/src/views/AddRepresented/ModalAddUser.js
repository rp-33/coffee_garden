import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';

class ModalAddUser extends Component{
	constructor(props){
		super(props);
		this.state = {
			names : '',
			lastNames : '',
			email:'',
			password:'',			
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
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
         				<h2 style={{textAlign:'center',color:'#e44a4c'}}>Agregar Representado</h2>
         				<form autoComplete="off">
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
								minlength="5"
								required
								value = {this.state.password}
								name="password"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							<div className="ctn-btn">
								<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        							registrar
     							</Fab>
							</div>
         				</form>
         			</Paper>
         		</div>
         	</Slide>
		)
	}

}

export default ModalAddUser;