import React,{Component} from 'react';
import {connect} from 'react-redux';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarMessage from '../../presentation/BarMessage';
import PropTypes from 'prop-types';
import {addBalance} from '../../services/api';
import {action_toast} from '../../actions/notification';

class ModalBalance extends Component{
	constructor(props){
		super(props);
		this.state = {
			value : '',
			error : '',
			isLoading : false
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handleSend(){
		try
		{
			this.setState({isLoading:true});
			let {user,handleSuccess} = this.props;
			let balance = parseInt(user.balance) + parseInt(this.state.value);
			let {status,data} =  await addBalance(user._id,balance);
			if(status === 201){
				handleSuccess(user._id,balance);
			}else if(status === 404)
			{
				this.setState({
					error : 'El usuario no existe'
				})
			}

		}
		catch(err)
		{
			this.props.handleErrorServer({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
		finally
		{
			this.setState({isLoading:false})
		}
	}

	render(){

		let {open,handleClose} = this.props;

		return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<div className="modal-balance">
				<Paper className="form-control">
					<div className="icon-close" onClick = {()=>handleClose(false)}>
                    	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               		</div>
         			<h2 style={{textAlign:'center',color:'#e44a4c'}}>Agregar saldo</h2>
         				{this.state.error &&
         					<BarMessage 
								title = {this.state.error}
							/>
         				}
         				<div className="ctn-input">
							<input 
							type="number" 
							placeholder="Ingrese el monto"
							value = {this.state.value}
							name="value"
							onChange = {this.handleChange.bind(this)}
							/>
						</div>
						{this.state.value != '' &&
						<div className="ctn-btn">	
							{this.state.isLoading	
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:				
								<Fab onClick = {this.handleSend.bind(this)} type="button" variant="extended" size="large" color="secondary" className="secondary">
        							Guardar
     							</Fab>     
     						}						
     					</div>
     					}
         		</Paper>
			</div>
		</Slide>
		)
	}
}

ModalBalance.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose :  PropTypes.func.isRequired,
	user : PropTypes.shape({
		_id : PropTypes.string,
		balance : PropTypes.string
	}).isRequired
}

const mapDispatchToProps = dispatch =>{
	return{
		handleErrorServer(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(null,mapDispatchToProps)(ModalBalance);