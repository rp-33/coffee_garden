import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../../routes/history';
import Fab from '@material-ui/core/Fab';
import Radio from '@material-ui/core/Radio';
import CheckIcon from '@material-ui/icons/Check';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import BarMessage from '../../presentation/BarMessage';
import {validateCompare} from '../../utils/validation';
import {findAllSchool,signup} from '../../services/api';
import {action_signup} from '../../actions/user';
import logo from '../../assets/logo.png';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			names : '',
			lastNames : '',
			email:'',
			password:'',
			repPassword : '',
			ci : '',
			term : false,
			countryCode : 58,
			phone:'',
			codeCi : 'V',
			error:'',
			isLoading : false
		}
	}

	componentDidMount(){
		this.getSchool();
	}


	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			console.log(data)
			if(status==200){
				this.setState({
					schools : data
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
			this.setState({
				isLoading:true,
				error:''
			})
			let {email,names,lastNames,codeCi,ci,phone,countryCode,school,password} = this.state;
			let {status,data} = await signup(email,names,lastNames,codeCi,ci,phone,countryCode,school,password);
			if(status==204){
				this.setState({
					error : "correo ya existe"
				})
			}else if(status==201){
				this.props.handleSignup(data);
				history.push('/'+data.rol);
			}
		}
		catch(error)
		{
			console.log(error)
		}
		finally
		{
			this.setState({
				isLoading:false
			})
		}
	}


	render(){
		return(
			<div className="signup">

				<img src={bgImg} alt="fondo" className="bg-img" />

				<form onSubmit = {this.handleSubmit.bind(this)}>
					<div className="ctn-logo">
						<img src={logo} alt="logo" />
					</div>
					<Hidden xsDown>
						{this.state.error &&
						<BarMessage 
							title = {this.state.error}
						/>
						}
					</Hidden>
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
								placeholder=" Documento de identidad" 
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
								required
								className="select"
								placeholder="seleccione una cantina"
          						value={this.state.school}
        						>
        							<option disabled value="seleccione una cantina">seleccione una cantina</option>
        							{
        								this.state.schools.map((item,i)=>
        									<option 
        									value={item._id} 
        									onClick={()=>this.setState({school:item._id})}
        									>
        										{item.name}
        									</option>
        							)}
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
					{
						(this.state.term && 
						validateCompare(this.state.password,this.state.repPassword,5) &&
						this.state.school != "seleccione una cantina"
						) 
					&&
					<div className="ctn-btn">
						{this.state.isLoading
						?
							<div className="ctn-loading">
								<CircularProgress color="secondary"/>
							</div>
						:
							<Fab  
							type="submit" 
							variant="extended" 
							size="large" 
							color="secondary" 
							className="secondary"
							>
        						registrar
     						</Fab>
     					}
					</div>
					}
					<p style={{textAlign:'center',marginTop:'20px'}}>
						<Link to="/" style={{color:'black'}}>Iniciar session</Link>
					</p>

					<Hidden smUp>
						{this.state.error &&
						<BarMessage 
							title = {this.state.error}
						/>
						}
					</Hidden>

				</form>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleSignup(data){
			dispatch(action_signup(data))
		}
	}
}

export default connect(null,mapDispatchToProps)(Signup);