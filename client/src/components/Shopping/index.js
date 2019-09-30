import React,{Component} from 'react';
import history from '../../routes/history';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import ModalProduct  from './ModalProduct';
import ModalPay from './ModalPay';
import {orderProducts} from '../../utils/products';
import CancelIcon from '@material-ui/icons/Cancel';
import {
	action_removeCart,
	action_removeShopping
} from '../../actions/cart';
import {action_balance} from '../../actions/user';
import './style.css';

class Shopping extends Component{
	constructor(props){
		super(props);
		this.state = {
			modal : false,
			modalPay : false,
			data : orderProducts(props.cart,props.match.params.date),
			selectProduct : {
				name : '',
				price:null,
				quantity : null,
				image : null
			}
		}
	}

	handleDelete({image}){
		this.setState(previousState =>{
			return{
				data : previousState.data.filter((item,i)=>{
					return item.image != image
				})
			}
		})
		this.props.handleRemoveCart(image);
	}

	handleSelect({name,image,price,quantity}){
		this.setState({
			modal:true,
			selectProduct:{
				name,
				price,
				image,
				quantity
			}
		})
	}

	handleSuccess(balance,date){
		console.log(balance,date)
		this.setState({
			modalPay : false
		});
		this.props.handleDecrBalance(balance);
		this.props.handleRemoveShopping(date);
		history.push(`/${this.props.rol}`);
	}

	render(){
		return(
			<div className="shopping">

				{this.state.modal &&
					<ModalProduct 
						open = {this.state.modal}
						product = {this.state.selectProduct}
						handleClose = {(modal)=>this.setState({modal})}
					/>
				}

				{this.state.modalPay &&

					<ModalPay
						open = {this.state.modalPay}
						user = {this.props.user}
						balance = {this.props.balance}
						products = {this.state.data}
						date = {this.props.match.params.date}
						handleSuccess = {this.handleSuccess.bind(this)}
						handleClose = {(modalPay)=>this.setState({modalPay})}
					/>

				}

				<section className="ctn">
					<span style={{fontSize:'1.5em',fontWeight:'bold'}}>Compras del {this.props.match.params.date}</span>
					{this.state.data.length>0 &&
					<Fab 
						onClick = {()=>this.setState({modalPay:true})}
                        variant="extended" 
                        color="secondary" 
                        className="secondary" 
                        style = {{marginLeft:'10px'}}
                    >
                        Pagar
                    </Fab>
                	}
					<div className="panel">
						{this.state.data.map((item,i)=>
							<div key = {i} className="item-card">
								<div className="icon-close" onClick = {this.handleDelete.bind(this,item)}>
                        			<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    			</div>
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
		user : state.user.representative || state.user._id,
		rol : state.user.rol,
		balance : state.user.balance,
		cart : state.cart.shopping
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleRemoveCart(image){
			dispatch(action_removeCart(image))
		},
		handleDecrBalance(balance){
			dispatch(action_balance(balance))
		},
		handleRemoveShopping(date){
			dispatch(action_removeShopping(date))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Shopping);