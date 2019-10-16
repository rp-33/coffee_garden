import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import ModalAdd from './ModalAdd';
import ModalInf from './ModalInf';
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
			modalAdd : false,
			modalInf : false,
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
		}
		catch(err)
		{
			this.props.handleErrorServer({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
	}

	handleAddVoucher(image){
		this.setState(prevState=>{
			return{
				modalAdd : false,
				data : prevState.data.concat({
					image,
					status : false
				})
			}
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

				<section className="ctn">
					<div className="ctn-btn">
						<Fab 
						onClick = {()=>this.setState({modalAdd:true})}
                        variant="extended" 
                        color="secondary" 
                        className="secondary" 
                        style = {{marginLeft:'10px'}}
                   	 	>
                        	cargar comprobante
                    	</Fab>
                    </div>
                	
					<div className="panel">
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
		handleErrorServer(payload){
			dispatch(action_toast(payload))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(VoucherPayment);