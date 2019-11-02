import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import ModalVoucher from './ModalVoucher';
import ModalBalance from './ModalBalance';
import NoData from '../../presentation/NoData';
import {
	findAllSchool,
	findAllVoucher
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import './style.css';

class Voucher extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			data : [],
			result : true,
			modalVoucher : false,
			modalBalance : false,
			user : {
				_id : '',
				balance : null
			},
			voucher :{
				_id : '',
				image : '',
				bank : ''
			}
		}
	}

	componentDidMount(){
		this.getSchool();
	}

	async _findAllVoucher(school){
		try
		{
			let {status,data} = await findAllVoucher(school,0);
			if(status === 200)
			{
				this.setState({
					data,
					result : true
				})
			}
			else if(status === 204)
			{
				this.setState({
					data : [],
					result : false
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}

		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			if(status === 200)
			{
				this.setState({
					schools : data
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	handleSelectShool(event){
		let school = event.target.value;
		this.setState({
			school
		},()=>{
			this._findAllVoucher(school)
		})
	}

	handleSelectVoucher({_id,user,image,bank}){
		this.setState({
			modalVoucher:true,
			voucher : {
				_id,
				image,
				bank
			},
			user : {
				_id :user._id,
				balance : user.balance
			}
		})
	}

	handleBalance(){
		this.setState({
			modalVoucher : false,
			modalBalance : true
		})
	}

	handleSuccess(){
		this.setState(prevState=>{
			return{
				modalBalance:false,
				data : prevState.data.filter((item,i)=>{
					return item._id !== prevState.voucher._id
				})
			}
		})
	}

	async handleMoreData(){
		try
		{
			let {status,data} = await findAllVoucher(this.state.school,this.state.data.length);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						data : prevState.data.concat(data),
						result : true
					}
				})
			}
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'No hay mas comprobantes',
					variant : 'info',
					open : true
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}

		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	render(){
		return(
			<div className="voucher">

				{
					this.state.modalVoucher &&
					<ModalVoucher 
						open = {this.state.modalVoucher}
						handleClose = {(modalVoucher)=>this.setState({modalVoucher})}
						voucher = {this.state.voucher}
						handleBalance = {this.handleBalance.bind(this)}
					/>
				}

				{
					this.state.modalBalance &&
					<ModalBalance
						open = {this.state.modalBalance}
						handleClose = {(modalBalance)=>this.setState({modalBalance})}
						user = {this.state.user}
						voucher = {this.state.voucher}
						handleSuccess = {this.handleSuccess.bind(this)}
					/>
				}

				<section className="ctn">
					<div className="ctn-cantina">
						<select
							required
							className="select"
							placeholder="seleccione una cantina"
          					value={this.state.school}
          					onChange = {this.handleSelectShool.bind(this)}
        				>
        					<option disabled value="seleccione una cantina">seleccione una cantina</option>
        					{
        						this.state.schools.map((item,i)=>
        							<option 
        								value={item._id}      								
        							>
        								{item.name}
        							</option>
        					)}
        				</select>
					</div>

					<div className="panel">

						{!this.state.result &&
							<NoData 
								message = "No hay resultados"
							/>
						}
					
						{
							this.state.data.length>0 &&
							<section style={{marginTop:'40px'}}>
								<div className="ctn-grid">
									<div style={{color:'#e44a4c',fontWeight:'bold'}}>cedula</div>
									<div style={{color:'#e44a4c',fontWeight:'bold'}}>nombre y apellido</div>
									<div style={{justifyContent: 'flex-end'}}>
										<EyeIcon fontSize="small" color="secondary" />
									</div>
								</div>
								{
									this.state.data.map((item,i)=>
									<div className="ctn-grid" key={item._id}>								
										<div>{item.user.ci}</div>
										<div>{item.user.names} {item.user.lastNames}</div>
										<div>
											<Button 
												onClick = {this.handleSelectVoucher.bind(this,item)}
											>
												Ver
											</Button>
										</div>									
									</div>
								)}
							</section>
						}

						{this.state.data.length>0 &&
							<div className="btn-more">
								<Button onClick={this.handleMoreData.bind(this)}>Mostrar mas</Button>
							</div>
						}
								
					</div>
				</section>
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

export default connect(null,mapDispatchToProps)(Voucher);