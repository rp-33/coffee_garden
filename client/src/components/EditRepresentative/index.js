import React,{Component} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditNames from './EditNames';
import EditPassword from './EditPassword';
import EditPhone from './EditPhone';
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
			email : '',
			countryCode : '',
			phone : ''
		}
	}

	componentDidMount(){
		this._getUser(this.props.user)
	}

	async _getUser(_id){
		try
		{	
			let {status,data} = await findUser(_id);
			if(status === 200)
			{
				let {names,lastNames,countryCode,phone} = data;
				this.setState({
					names,
					lastNames,
					countryCode,
					phone
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

	handleSuccessPhone(countryCode,phone){
		this.setState({
			type:'none',
			countryCode,
			phone
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
						<p>{this.state.countryCode}{this.state.phone}</p>
						<IconButton 
							onClick={()=>this.setState({type:'phone'})}
							aria-label="value"
							color="secondary"
							>
        					<EditIcon/>
      					</IconButton>
					</div>
					<div className="ctn-edit">
						<p>Contrase??a</p>
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
			case 'phone':
					return(
						<EditPhone
							user = {user}
							countryCode = {this.state.countryCode}
							phone = {this.state.phone}
							handleBack = {(type)=>this.setState({type})}
							handleSuccess = {this.handleSuccessPhone.bind(this)}
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
				{this._typeInput(this.state.type,this.props.user)}
			</div>
		)
	}
}

const mapStateToProps = (state,props)=>{
    return{
        user : state.user._id
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditRepresented);