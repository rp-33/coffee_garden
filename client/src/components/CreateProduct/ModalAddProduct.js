import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import photoImg from '../../assets/foto.png';
import FileReader from '../../services/reader';
import PropTypes from 'prop-types';
import {createProduct} from '../../services/api';


class ModalAddProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			name : '',
			price : '',
			file : {},
			base64 : '',
			isLoading : false
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
			this.setState({isLoading:true});
			let {name,price,file} = this.state;

			let {status,data} = await createProduct(this.props._id,name,price,file);

			if(status==201)
			{
				this.props.handleSubmit(name,data._id,data.image);
			}
		}
		catch(err)
		{
			alert(err)
		}
		finally
		{
			this.setState({
				name : '',
				price : '',
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
         		<div className="modal-add-product">
         			<Paper className="form-control">
         			<form onSubmit = {this.handleSubmit.bind(this)}>
                    	<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         				<h2 style={{color:'#e2474b',textAlign:'center'}}>Crear producto</h2>
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
         				<div className="ctn-input">
         					<input 
         						type = "text"
         						placeholder = "Nombre del producto"
         						required
         						name ="name"
         						value = {this.state.name}
         						onChange = {this.handleChange.bind(this)}
         					/>
         				</div>
         				<div className="ctn-input">
         					<input 
         						type = "number"
         						placeholder = "Precio"
         						required
         						name = "price"
         						value = {this.state.price}
         						onChange = {this.handleChange.bind(this)}
         					/>
         				</div>
         				{this.state.base64 &&
         					<div className="ctn-btn">
         						{this.state.isLoading	
								?
									<div className="ctn-loading">
										<CircularProgress color="secondary"/>
									</div>
								:			
                            		<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary" style={{marginTop:'20px'}}>
                                		guardar
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
	open : PropTypes.bool.isRequired,
	_id : PropTypes.string.isRequired,
	handleClose : PropTypes.func.isRequired,
	handleSubmit : PropTypes.func.isRequired
}

export default ModalAddProduct;