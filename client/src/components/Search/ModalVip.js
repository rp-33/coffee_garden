import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarMessage from '../../presentation/BarMessage';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import {changeVip} from '../../services/api';

class ModalBalance extends Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.user.vip ? 'vip' : 'novip',
			error : '',
			isLoading : false
		}
	}

	handleChange(event){
		this.setState({
			value : event.target.value
		})
	}

	async handleSend(){
		try
		{
			this.setState({
				isLoading:true,
				error : ''
			});
			let {user,handleSuccess} = this.props;
			let vip = this.state.value == 'vip' ? true : false;
			let {status,data} =  await changeVip(user._id,vip);
			if(status === 204)
			{
				handleSuccess(user._id,vip);
			}
			else if(status === 500)
			{
				this.setState({
					error : 'Error en el servidor'
				})
			}
			else
			{
				this.setState({
					error : data.error
				})
			}

		}
		catch(err)
		{
			this.setState({
				error : 'Error'
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
			<div className="modal-vip">
				<Paper className="form-control">
					<div className="icon-close" onClick = {()=>handleClose(false)}>
                    	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               		</div>
         			<h2 style={{textAlign:'center',color:'#e44a4c'}}>VIP</h2>
         			<BarMessage 
						title = {this.state.error}
					/>

         				<FormControl component="fieldset">
        					<RadioGroup 
        						aria-label="vip" 
        						name="vip" 
        						value={this.state.value} 
        						onChange={this.handleChange.bind(this)}
        					>
          						<FormControlLabel value="vip" control={<Radio />} label="Usuario vip" />
          						<FormControlLabel value="novip" control={<Radio />} label="Usuario no vip" />
        					</RadioGroup>
      					</FormControl>

						<div className="ctn-btn">	
							{this.state.isLoading	
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:				
								<Fab 
									onClick = {this.handleSend.bind(this)} 
									type="button" 
									variant="extended"  
									color="secondary" 
									className="secondary"
								>
        							Guardar
     							</Fab>     
     						}						
     					</div>
     					
         		</Paper>
			</div>
		</Slide>
		)
	}
}

ModalBalance.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose :  PropTypes.func.isRequired,
	handleSuccess : PropTypes.func.isRequired,
	user : PropTypes.shape({
		_id : PropTypes.string
	}).isRequired
}

export default ModalBalance;