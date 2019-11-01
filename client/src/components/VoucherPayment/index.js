import React,{Component} from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import UploadIcon from '@material-ui/icons/CloudUpload';
import InformationIcon from '@material-ui/icons/AccountBalance';
import ModalAdd from './ModalAdd';
import ModalInf from './ModalInf';
import ModalBank from './ModalBank';
import NoData from '../../presentation/NoData';
import {
	findAllMyVoucher
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import './style.css';

class VoucherPayment extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : [],
			result : true,
			modalAdd : false,
			modalInf : false,
			modalBank : false,
			voucher : {
				image:'',
				status:false
			}
		}
	}

	componentDidMount(){
		this._getVoucher()
	}

	async _getVoucher(){
		try
		{
			let {status,data} = await findAllMyVoucher();
			if(status === 200)
			{
				this.setState({
					data
				})
			}
			else if(status === 204)
			{
				this.setState({
					result:false
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'error',
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

	handleAddVoucher(image){
		this.setState(prevState=>{
			return{
				result : true,
				modalAdd : false,
				data : prevState.data.concat({
					image,
					status : false
				})
			}
		},()=>{
			this.props.handleToast({
				title : 'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleSelect({image,status}){
		this.setState({
			modalInf :true,
			voucher : {
				image,
				status
			}
		})
	}

	render(){
		return(
			<div className="voucher-payment">

				{this.state.modalAdd &&
					<ModalAdd
						user = {this.props.user}
						school = {this.props.school}
						open = {this.state.modalAdd}
						handleClose = {(modalAdd)=>this.setState({modalAdd})}
						handleSubmit = {this.handleAddVoucher.bind(this)}
					/>
				}

				{this.state.modalInf &&
					<ModalInf 
						open = {this.state.modalInf}
						voucher = {this.state.voucher}
						handleClose = {(modalInf)=>this.setState({modalInf})}
					/>
				}

				{this.state.modalBank &&
					<ModalBank
						open = {this.state.modalBank}
						handleClose = {(modalBank)=>this.setState({modalBank})}
					/>
				}

				<section className="ctn">
					<div className="ctn-btn">
						<Tooltip title="Subir comprobante de pago" aria-label="vouched payment">
							<Fab 
							onClick = {()=>this.setState({modalAdd:true})}
                        	color="secondary" 
                        	className="secondary" 
                        	style = {{marginLeft:'10px'}}	
							>
  								<UploadIcon />
							</Fab>
						</Tooltip>
						<Tooltip title="Bancos a depositar" aria-label="information">
							<Fab 
							onClick = {()=>this.setState({modalBank:true})}
							color="default" 
							style = {{marginLeft:'20px'}}	
							>
  								<InformationIcon />
							</Fab>
						</Tooltip>
                    </div>
                	
					<div className="panel">

						{!this.state.result && 
							<NoData 
								message = "No ha subido un comprobante"
							/>
						}

						{this.state.data.map((item,i)=>
							<div key = {i} className="item-card">
								<img src={item.image} alt={item.name} onClick={this.handleSelect.bind(this,item)} />		
							</div>
						)}
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state,props)=>{
    return{
    	user : state.user._id,
    	school : state.user.school
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(VoucherPayment);