import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import BarMessage from '../../presentation/BarMessage';
import {createSchool} from '../../services/api';
import FileReader from '../../services/reader';
import PropTypes from 'prop-types';

class ModalAdd extends Component{
	constructor(props){
		super(props);
		this.state = {
			name : '',
			file : {},
			base64 : '',
			loading : false,
			error:''
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
			file:{}
		})
	}

	async handleSubmit(event){
		try
		{
			event.preventDefault();
			this.setState({
				loading:true,
				error: ''
			})
			let {name,file} = this.state;
			let {status,data} = await createSchool(name,file);
			this.setState({
				name :'',
				base64 : '',
				file : {}
			});
			if(status === 201)
			{
				this.props.handleSubmit(data);
			}
			else if(status === 500)
			{
				this.setState({
					error : 'Error en el servidor'
				})
			}
			else{
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
			this.setState({
				loading : false
			})
		}
	}

	render(){
		let {open,handleClose} = this.props;
		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         		<div className="modal-add">
         			<Paper className="form-control">
         				<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         				<h2 style={{textAlign:'center',color:'#e44a4c'}}>Agregar Cantina</h2>
						<BarMessage 
							title={this.state.error}
						/>
         				<form autoComplete="off" onSubmit = {this.handleSubmit.bind(this)}>
         					<div className="ctn-input">
								<input 
								type="text" 
								placeholder="Nombre de la cantina" 
								required 								
								name="name"
								value = {this.state.name}
								onChange = {this.handleChange.bind(this)}
								/>
							</div>
							{this.state.base64
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
							{this.state.loading
							?
								<div className="ctn-loading">
									<CircularProgress color="secondary"/>
								</div>
							:
								<div className="ctn-btn">
									<Fab disabled = {!this.state.base64} type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary">
        								guardar
     								</Fab>
								</div>
							}
         				</form>
         			</Paper>
         		</div>
         	</Slide>
		)
	}

}

ModalAdd.propTypes = {
	open :PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
	handleSubmit : PropTypes.func.isRequired
}

export default ModalAdd;