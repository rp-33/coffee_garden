import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import PropTypes from 'prop-types';
import {editAvatarSchool} from '../../services/api';
import FileReader from '../../services/reader';

class ModalEditAvatar extends Component{
	constructor(props){
		super(props);
		this.state = {
			_id : props._id,
			isLoading :false,
			file : {},
			base64 : '',
			error : ''
		}
	}

	async handleSubmit(){
		try
		{
			this.setState({
				isLoading:true,
				error : ''
			});
			let {_id,file} = this.state;
			let {status,data} = await editAvatarSchool(_id,file);
			if(status === 201)
			{
				this.props.handleSuccess(_id,data.image);
			}
			else if(status === 500)
			{
				this.setState({
					error:'Error en el servidor'
				})
			}
			else
			{
				this.setState({
					error:data.error
				})
				
			}
		}
		catch(err)
		{
			this.setState({
				error:'Error'
			})
		}
		finally{
			this.setState({
				isLoading:false
			})
		}
	}


	handleImage(event){
		var file = event.target.files[0];
		FileReader(file)
		.then((base64)=>{
			this.setState({
				base64,
				file
			})
		})

	}

	removeImage(){
		this.setState({
			base64 : '',
			file:{}
		})
	}


	render(){

		let {open,handleClose} = this.props;

		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
				<div className="modal-edit-avatar">
					<Paper className="form-control">
					<div className="icon-close" onClick = {()=>handleClose(false)}>
                    	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
               		</div>
         			<h2 style={{textAlign:'center',color:'#e44a4c'}}>Editar</h2>

						<BarMessage 
							title = {this.state.error}
						/>

						{this.state.base64 !== ''
						?

							<div className="ctn-img">
								<img src={this.state.base64} alt="logo"/>
								<CancelIcon fontSize="small" className="icon" onClick={this.removeImage.bind(this)}/>
							</div>
							:
							<div>
								<input
        						accept="image/*"
        						id="contained-button-file"
        						required
        						type="file"
        						name ="file"
        						style={{ display: 'none'}}
        						onChange = {this.handleImage.bind(this)}
      							/>
								<label htmlFor="contained-button-file">
        							<Button variant="contained" component="span" fullWidth style={{backgroundColor:'rgba(252,180,160,1)',color:'white'}}>
         								imagen
        							</Button>
      							</label>
							</div>
						}
						{this.state.base64 !== '' &&
						<div className="ctn-btn">	
							{this.state.isLoading 
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:				
								<Fab  
									type="button" 
									variant="extended" 
									color="secondary" 
									className="secondary"
									onClick = {this.handleSubmit.bind(this)}
								>
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

ModalEditAvatar.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
	handleSuccess : PropTypes.func.isRequired,
	_id: PropTypes.string.isRequired
}

export default ModalEditAvatar;