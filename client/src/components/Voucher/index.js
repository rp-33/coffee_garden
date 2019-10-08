import React,{Component} from 'react';
import ModalVoucher from './ModalVoucher';
import ModalBalance from './ModalBalance';
import {
	findAllSchool,
	findAllVoucher
} from '../../services/api';
import './style.css';

class Voucher extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			data : [],
			modalVoucher : false,
			modalBalance : false,
			user : {
				_id : '',
				balance : null
			},
			voucher :{
				_id : '',
				image : ''
			}
		}
	}

	componentDidMount(){
		this.getSchool();
	}

	async _findAllVoucher(school){
		try
		{
			let {status,data} = await findAllVoucher(school);
			console.log(data)
			if(status==200){
				this.setState({
					data
				})
			}
		}
		catch(err)
		{
			alert(err);
		}
	}

	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			if(status==200){
				this.setState({
					schools : data
				})
			}
		}
		catch(err)
		{
			alert(err);
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

	handleSelectVoucher({_id,user,image}){
		this.setState({
			modalVoucher:true,
			voucher : {
				_id,
				image
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
					return item._id != prevState.voucher._id
				})
			}
		})
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
					
						{
							this.state.data.length>0 &&
							<section style={{marginTop:'40px'}}>
								<div className="ctn-grid">
									<div style={{color:'#e44a4c',fontWeight:'bold'}}>cedula</div>
									<div style={{color:'#e44a4c',fontWeight:'bold'}}>nombre y apellido</div>
									<div style={{color:'#e44a4c',fontWeight:'bold'}}>comprobante</div>
								</div>
								{
									this.state.data.map((item,i)=>
									<div className="ctn-grid">								
										<div>{item.user.ci}</div>
										<div>{item.user.names} {item.user.lastNames}</div>
										<div 
											onClick = {this.handleSelectVoucher.bind(this,item)}
											style={{cursor:'pointer'}}
										>
											ver comprobante
										</div>									
									</div>
								)}
							</section>
						}
								
					</div>
				</section>
			</div>
		)
	}
}

export default Voucher;