import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import CheckIcon from '@material-ui/icons/Check';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {validateCompare} from '../../utils/validation';
import logo from '../../assets/logo.png';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {
			names : '',
			lastNames : '',
			email:'',
			password:'',
			repPassword : '',
			ci : '',
			term : false,
			countryCode : 58,
			phone:'',
			codeCi : 'V'
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	handleSubmit(event){
		event.preventDefault();
		console.log('send form')
	}


	render(){
		return(
			<div className="signup">

				<img src={bgImg} alt="fondo" className="bg-img" />

				<form onSubmit = {this.handleSubmit.bind(this)}>
					<div className="ctn-logo">
						<img src={logo} alt="logo" />
					</div>
					<Grid container spacing={3}>
					    <Grid item xs={12} sm={6}>
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
						</Grid>
						<Grid item xs={12} sm={6}>
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
						</Grid>
						<Grid item xs={12} sm={6}>
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
						</Grid>
						<Grid item xs={12} sm={6}>
							<div className="ctn-select">
								<select
								onChange = {(event)=>this.setState({countryCode:event.target.value})}
								className="select"
          						value={this.state.countryCode}
        						>
        							<option value="58">58</option>
        				 			<option value="57">57</option>
        						</select>
        						<input 
								type="number" 
								placeholder="Telefono" 
								required 
								value = {this.state.phone}
								name="phone"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
						</Grid>
						<Grid item xs={12} sm={6}>
							<div className="ctn-select">
								<select
								className="select"
								onChange = {(event)=>this.setState({codeCi:event.target.value})}
          						value={this.state.codeCi}
        						>
        							<option value="V">V</option>
        				 			<option value="E">E</option>
        						</select>
        						<input 
								type="number" 
								placeholder="Documento de identidad" 
								required 
								value = {this.state.ci}
								name="ci"
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
						</Grid>
						<Grid item xs={12} sm={6}>
							<div className="ctn-cantina">
								<select
								className="select"
          						value="placeholder"
        						>
        							<option disabled value="placeholder">seleccione una cantina</option>
        						</select>
							</div>
						</Grid>
						<Grid item xs={12} sm={6}>
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
						</Grid>
						<Grid item xs={12} sm={6}>
							<div className="ctn-input">
								<input 
								type="password" 
								placeholder="Validar Contraseña" 
								minlength="5"
								required
								value = {this.state.repPassword} 
								name="repPassword"
								onChange = {this.handleChange.bind(this)}
								/>
								<Fade in={validateCompare(this.state.password,this.state.repPassword,5)}>
									<CheckIcon fontSize="mediun" className="icon"/>
								</Fade>
							</div>
						</Grid>
					</Grid>

					<div className="ctn-term">
						<div>
							<Radio
        						checked={this.state.term}
        						onClick = {()=>this.setState(previousState=>{return{term:!previousState.term}})}
        						value="terminos y condiciones"
        						color="default"
        						name="radio-button-demo"
        						inputProps={{ 'aria-label': 'Terminos y Condiciones' }}
      						/>
      						<p style={{textAlign:'center'}}>Acepto los terminos y condiciones</p>
						</div>
						<p style={{textAlign:'center'}}>
							<a href="#" style={{color:'#c7c7c7'}}>Terminos y condiciones</a>
						</p>
					</div>

					<div className="ctn-btn">
						<Fab disabled={!validateCompare(this.state.password,this.state.repPassword,5)} type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        					registrar
     					</Fab>
					</div>

				</form>

			</div>
		)
	}
}

export default Signup;