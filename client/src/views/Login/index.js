import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InformationIcon from '@material-ui/icons/PriorityHigh';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import logo from '../../assets/logo.png';
import escudo from '../../assets/escudo.png';
import './style.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : ''
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
			<div className="login">

				<form onSubmit = {this.handleSubmit.bind(this)}>
					<div className="ctn-logo">
						<img src={logo} alt="logo" />
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
							required
							value = {this.state.password} 
							name="password"
							onChange = {this.handleChange.bind(this)}
						/>
					</div>
					<div className="ctn-btn">
						<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        					iniciar sessión
     					</Fab>
					</div>
		
					<div className="ctn-text">
						<div style={{marginTop:'10px'}}> 
							<a href="#" style={{fontWeight:'bold',color:'#8e8c89',textDecoration:'none'}}>Registrarse</a>
						</div>
						<div style={{marginTop:'10px'}}> 
							<a href="#" style={{color:'#c7c7c7'}}>Terminos y condiciones</a>
						</div>
					</div>
					<div className="ctn-icon">
						<InformationIcon fontSize="large" style={{color:'#e44a4c'}}/>
					</div>
				</form>

				<div className="cnt-client">
					<p style={{color:'#e44a4c',fontWeight:'bold'}}>Nuestros clientes</p>
					<div style={{display:'flex',flexDirection:'row'}}>
						<IconButton aria-label="back"><ArrowLeftIcon fontSize="large" style={{color:'#e44a4c',fontSize:'2em'}} /></IconButton>
						<div>
						{
							[1,2,3,4].map((item,i)=>
								<img key={item} src={escudo} alt="logo"/>
						)}
						</div>
						<IconButton aria-label="next"><ArrowRightIcon fontSize="large" style={{color:'#e44a4c',fontSize:'2em'}} /></IconButton>	
				
					</div>
				</div>

			</div>
		)
	}
}

export default Login;