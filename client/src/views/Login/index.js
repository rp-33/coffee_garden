import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import history from '../../routes/history';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InformationIcon from '@material-ui/icons/PriorityHigh';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarMessage from '../../presentation/BarMessage';
import {login,findAllSchool} from '../../services/api';
import {action_login} from '../../actions/user';
import logo from '../../assets/logo.png';
import escudo from '../../assets/escudo.png';
import './style.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : '',
			errorLogin : '',
			loading : false,
			school : []
		}
	}

	componentDidMount(){
		this.getSchool();
	}


	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			if(status==200){
				this.setState({
					school : data
				})
			}
		}
		catch(err)
		{
			console.log(err);
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
			
			this.setState({loading:true});

			let {email,password} = this.state;

			let {status,data} = await login(email,password);

			if(status == 200)
			{
				this.props.handleLogin(data);
				console.log(data)
				history.push('/'+data.rol);
			}
			else
			{

				this.setState({
					loading:false,
					erroLogin : data.error
				})	
			}
		}
		catch(err)
		{
			this.setState({
				loading:false,
				erroLogin : 'Error en el servidor'
			})
		}
		
	}

	render(){
		return(
			<div className="login">

				<form onSubmit = {this.handleSubmit.bind(this)}>
					<div className="ctn-logo">
						<img src={logo} alt="logo" />
					</div>
					{this.state.erroLogin &&
						<BarMessage 
							title = {this.state.erroLogin}
						/>
					}
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
						{this.state.loading
						?
							<div className="ctn-loading">
								<CircularProgress color="secondary"/>
							</div>
						:
							<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        						iniciar sessión
     						</Fab>
     					}
					</div>
		
					<div className="ctn-text">
						<div style={{marginTop:'10px'}}> 
							<Link to="/signup" style={{fontWeight:'bold',color:'#8e8c89',textDecoration:'none'}}>Registrarse</Link>
						</div>
					</div>
					<div className="ctn-icon">
						<InformationIcon fontSize="large" style={{color:'#e44a4c'}}/>
					</div>
				</form>

				<div className="cnt-client">
					<p style={{color:'#e44a4c',fontWeight:'bold'}}>Nuestros clientes</p>
					<div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
						{
							this.state.school.map((item,i)=>
								<img key={i} src={item.avatar} alt="logo" style={{borderRadius:'10px'}}/>
						)}
					</div>
				</div>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleLogin(data){
			dispatch(action_login(data))
		}
	}
}

export default connect(null,mapDispatchToProps)(Login);