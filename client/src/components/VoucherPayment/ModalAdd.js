import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import photoImg from '../../assets/foto.png';
import FileReader from '../../services/reader';
import BarMessage from '../../presentation/BarMessage';
import PropTypes from 'prop-types';
import {createVoucherPayment} from '../../services/api';

class ModalAddProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			file : {},
			base64 : '',
			isLoading : false,
			error : ''
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
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
			file: ''
		})
	}

	async handleSubmit(event){
		try
		{
			event.preventDefault();
			this.setState({
				error : '',
				isLoading:true
			});
			let {file} = this.state;
			let {status,data} = await createVoucherPayment(this.props.user,this.props.school,file);
			if(status === 201)
			{
				this.props.handleSubmit(data.image);
			}
			else if(status === 500)
			{
				this.setState({
					error :  'Error en el servidor'
				})
			}
			else
			{
				this.setState({
					error :  data.error
				})
			}
		
		}
		catch(err)
		{
			this.setState({
				error :  'Error'
			})
		}
		finally
		{
			this.setState({
				file : {},
				base64 : '',
				isLoading : false
			})
		}
	}


	render(){
		let {open,handleClose} = this.props;
		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         		<div className="modal-add">
         			<Paper className="form-control">
         			<form onSubmit = {this.handleSubmit.bind(this)}>
                    	<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         				<h2 style={{textAlign:'center'}}>Cargar comprobante de pago</h2>
         				<BarMessage 
         					title = {this.state.error}
         				/>
         				{!this.state.base64
         				?
         					<div className="ctn-file">
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
         							<img src={photoImg} alt="subir archivo"/>
         						</label>
         					</div>
         				:
         					<div className="ctn-img">
         						<img src={this.state.base64} alt="image"/>
         						<CancelIcon fontSize="small" className="icon" onClick={this.removeImage.bind(this)}/>					
         					</div>
         				}
         				{this.state.base64 &&
         					<div className="ctn-btn">
         						{this.state.isLoading	
								?
									<div className="ctn-loading">
										<CircularProgress color="secondary"/>
									</div>
								:			
                            		<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary" style={{marginTop:'20px'}}>
                                		enviar
                           	 		</Fab>
                           	 	}
                        	</div>
                        }
                    </form>
         			</Paper>
         		</div>
        	</Slide>
		)
	}
}


ModalAddProduct.propTypes = {
	user : PropTypes.string.isRequired,
	school : PropTypes.string.isRequired,
    open : PropTypes.bool.isRequired,
    handleClose : PropTypes.func.isRequired,
   	handleSubmit : PropTypes.func.isRequired
}

export default ModalAddProduct;