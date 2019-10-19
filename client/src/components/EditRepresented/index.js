import React,{Component} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditEmail from './EditEmail';
import EditNames from './EditNames';
import EditPassword from './EditPassword';
import {
	findUser
} from '../../services/api';
import {action_toast} from '../../actions/notification';

class EditRepresented extends Component{
	constructor(props){
		super(props);
		this.state = {
			type : 'none',
			names:'',
			lastNames:'',
			email : ''
		}
	}

	componentDidMount(){
		this._getUser(this.props.match.params.id)
	}

	async _getUser(_id){
		try
		{	
			let {status,data} = await findUser(_id);
			if(status === 200)
			{
				let {names,lastNames,email} = data;
				this.setState({
					names,
					lastNames,
					email
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
	}

	handleSuccessEmail(email){
		this.setState({
			email,
			type:'none'
		},()=>{
			this.props.handleToast({
				title:'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleSuccessNames(names,lastNames){
		this.setState({
			names,
			lastNames,
			type:'none'
		},()=>{
			this.props.handleToast({
				title:'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleSuccessPassword(){
		this.setState({
			type:'none'
		},()=>{
			this.props.handleToast({
				title:'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	_typeInput(type,user){
		switch(type){
			case 'none':
				return(
					<form>
					<h2 className="title">Editar</h2>
					<div className="ctn-edit">
						<p>{this.state.email}</p>
						<IconButton 
							onClick={()=>this.setState({type:'email'})}
							aria-label="value"
							color="secondary"
						>
        					<EditIcon/>
      					</IconButton>
					</div>
					<div className="ctn-edit">
						<p>{this.state.names} {this.state.lastNames}</p>
						<IconButton 
							onClick={()=>this.setState({type:'names'})}
							aria-label="value"
							color="secondary"
							>
        					<EditIcon/>
      					</IconButton>
					</div>
					<div className="ctn-edit">
						<p>Contraseña</p>
						<IconButton 
							onClick={()=>this.setState({type:'password'})}
							aria-label="value"
							color="secondary"
							>
        					<EditIcon/>
      					</IconButton>
					</div>
				</form>
				)
			case 'email':
				return(
					<EditEmail
						value={this.state.email}	
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {this.handleSuccessEmail.bind(this)}	
					/>
				)
			case 'names':
				return(
					<EditNames
						names={this.state.names}
						lastNames = {this.state.lastNames}	
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {this.handleSuccessNames.bind(this)}
					/>
				)
			case 'password':
				return(
					<EditPassword
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {this.handleSuccessPassword.bind(this)}
					/>
				)
			default:
				return(
					<h1>editar</h1>
				)
		}
	}

	render(){
		return(
			<div className="edit-user">
				{this._typeInput(this.state.type,this.props.match.params.id)}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(null,mapDispatchToProps)(EditRepresented);