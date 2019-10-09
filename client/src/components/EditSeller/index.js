import React,{Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditCi from './EditCi';
import EditEmail from './EditEmail';
import EditNames from './EditNames';
import EditPassword from './EditPassword';
import {
	findUser
} from '../../services/api';
import './style.css'

class EditSeller extends Component{
	constructor(props){
		super(props);
		this.state = {
			type : 'none',
			names:'',
			lastNames:'',
			ci : '',
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
			if(status==200)
			{
				let {names,lastNames,ci,email} = data;
				this.setState({
					names,
					lastNames,
					ci,
					email
				})
			}
		}
		catch(err)
		{
			alert(err)
		}
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
						<p>{this.state.ci}</p>
						<IconButton 
							onClick={()=>this.setState({type:'ci'})}
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
			case 'ci':
				return(
					<EditCi 	
						value={this.state.ci}	
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {(ci)=>this.setState({ci,type:'none'})}		
					/>
				)
			case 'email':
				return(
					<EditEmail
						value={this.state.email}	
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {(email)=>this.setState({email,type:'none'})}		
					/>
				)
			case 'names':
				return(
					<EditNames
						names={this.state.names}
						lastNames = {this.state.lastNames}	
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {(names,lastNames)=>this.setState({names,lastNames,type:'none'})}		
					/>
				)
			case 'password':
				return(
					<EditPassword
						user = {user}
						handleBack = {(type)=>this.setState({type})}
						handleSuccess = {()=>this.setState({type:'none'})}		
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
			<div className="edit-seller">
				{this._typeInput(this.state.type,this.props.match.params.id)}
			</div>
		)
	}
}

export default EditSeller;