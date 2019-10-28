import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import ModalProduct from './ModalProduct';
import ListProduct from './ListProduct';
import ListShopping from './ListShopping';
import ModalPay from './ModalPay';
import ModalPayUser from './ModalPayUser';
import ModalAddUser from './ModalAddUser';
import {
	findAllProducts
} from '../../services/api';
import {weekDay} from '../../utils/date';
import {action_toast} from '../../actions/notification';
import {
	action_addShoppingUser,
    action_removeShoppingUser
} from '../../actions/shoppingUser';
import socket from '../../services/socket';
import './style.css';

class Sell extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories : [],
			drawer : false,
			modal : false,
			modalPay :false,
			modalPayUser : false,
			modalAddUser : false,
			quantity : 1,
			selectDate : weekDay()[0],
			productDetails:{
				image : null,
				price : null,
				name : ''
			},
			shopping : []
		}
	}

	componentDidMount(){
		this.getProducts(this.props.school);
	}

	async getProducts(school){
		let {status,data} = await findAllProducts(school);
		if(status === 200)
		{
			this.setState({
				categories:data
			})
		}
	}

	handleAddQuantity(){
		this.setState(prevState=>{
			return{
				quantity : prevState.quantity + 1
			}
		})
	}


	handleDecreaseQuantity(){
		this.setState(prevState=>{
			return{
				quantity : prevState.quantity - 1
			}
		})
	}

	handleSelectProduct({name,price,image}){
		this.setState({
			modal : true,
			error : '',
			productDetails :{
				name,
				price,
				image
			}
		})
	}

	handleSaveProduct(){

		let {
			selectDate,
			quantity,
			productDetails,
		} = this.state;

		let position = this.state.shopping.findIndex(item=>{
			return item.image === productDetails.image
		})

		if(position ===-1)
		{

			this.setState(prevState =>{
				return{
					shopping : prevState.shopping.concat({
						date : selectDate.date,
						quantity,
						name : productDetails.name,
						price : productDetails.price,
						image : productDetails.image
					}),
					modal:false,
					quantity : 1
				}
			})
		}
		else
		{
			this.setState(prevState=>{
				return {
                ...prevState,
                shopping : [
                    ...prevState.shopping.slice(0,position),// Copia el objeto antes de modificarlo
                    Object.assign({}, prevState.shopping[position], {
                    	quantity : prevState.shopping[position].quantity + quantity
                    }),
                    ...prevState.shopping.slice(position + 1)
                ], 
				modal:false,
				quantity : 1
           	}
			})
		}
	}

	handleDeleteProduct(index){
		this.setState(prevState=>{
			return{
				shopping : prevState.shopping.filter((item,i)=>{
					return i !== index
				})
			}
		})
	}

	handleSuccess(date){
		this.setState(prevState=>{
			return{
				modalPay : false,
				shopping : []
			}
		},()=>{
			this.props.handleToast({
				title : 'Compra realizada',
				variant : 'success',
				open : true
			})
		})
	}

	handleSaveUser(user){
		this.setState({
			modalAddUser : false			
		},()=>{
			this.props.handleSaveUser(user)
		})
		
	}

	handleRemoveUser(){
		this.setState({
			shopping : []
		},()=>{
			this.props.handleToast({
				title : 'Ha eliminado el usuario',
				variant : 'info',
				open : true
			})
			this.props.handleRemoveUser()
		})
	}

	handleSuccessPayUser(user,vouched,balance){
		this.setState({
			modalPayUser : false,
			shopping : []
		},()=>{
			socket.emit('balance',{
				channel : user,
				balance,
				vouched
			});
			this.props.handleToast({
				title : 'Compra realizada con exito',
				variant : 'success',
				open : true
			})
			this.props.handleRemoveUser()
		})
	}

	handleModalPay(){
		if(this.props.shoppingUser._id)
		{
			this.setState({modalPayUser:true})
		}
		else
		{
			this.setState({modalPay:true})
		}
	}

	render(){

		return(
			<div className="sell">

				{this.state.modal &&
					<ModalProduct 
						open = {this.state.modal}
						product = {this.state.productDetails}
						quantity = {this.state.quantity}
						handleAddQuantity = {this.handleAddQuantity.bind(this)}
						handleDecreaseQuantity = {this.handleDecreaseQuantity.bind(this)}
						handleClose = {(modal)=>this.setState({modal})}
						handleSave = {this.handleSaveProduct.bind(this)}
					/>
				}
				{this.state.modalPay &&
					<ModalPay
						open = {this.state.modalPay}
						school = {this.props.school}
						products = {this.state.shopping}
						date = {this.state.selectDate.date}
						handleSuccess = {this.handleSuccess.bind(this)}
						handleClose = {(modalPay)=>this.setState({modalPay})}
					/>
				}

				{this.state.modalPayUser &&
					<ModalPayUser
						open = {this.state.modalPayUser}
						user = {this.props.shoppingUser._id}
						school = {this.props.school}
						products = {this.state.shopping}
						date = {this.state.selectDate.date}
						handleSuccess = {this.handleSuccessPayUser.bind(this)}
						handleClose = {(modalPayUser)=>this.setState({modalPayUser})}
					/>
				}

				{this.state.modalAddUser &&
					<ModalAddUser
						open = {this.state.modalAddUser}
						handleClose = {(modalAddUser)=>this.setState({modalAddUser})}
						handleSave = {this.handleSaveUser.bind(this)}
					/>
				}

				<section className="ctn">
					{this.props.shoppingUser._id &&
						<Chip
						icon={<FaceIcon />}
						color = "secondary"
        				label={`${this.props.shoppingUser.names} ${this.props.shoppingUser.lastNames}`}
        				onDelete={this.handleRemoveUser.bind(this)}
      					/>
					}
					{this.state.shopping.length>0 &&
					<div className="ctn-shopping">
						<div className="item-product">
							<ListShopping 
								list = {this.state.shopping}
								handleDelete = {this.handleDeleteProduct.bind(this)}
							/>
						</div>
					</div>
					}

					<div style={{marginLeft:'10px'}}>
						{this.state.shopping.length>0
						?
							<Fab 
								onClick = {this.handleModalPay.bind(this)}
                        		variant="extended" 
                        		size="large"
                        		color="secondary" 
                        		className="secondary" 
                        		style={{marginTop:'20px'}}
                        	>
                           		procesar compra
                        	</Fab>
						:
							<div>
								{!this.props.shoppingUser._id &&
								<div>
									<h3>¿Usuario dispone de cuenta?</h3>
									<Button
									variant="contained" 
									color="secondary"
									onClick = {()=>this.setState({modalAddUser:true})}
									>
										SI
									</Button>
								</div>
								}
							</div>
						}
					</div>

					
					<section className="panel">
					{this.state.categories.map((item,index)=>

						<div key={index} className="ctn-product">
							<div className="type">
								<span>{item.name}</span>
							</div>
							<div className="item-product">
								<ListProduct 
									list = {item.products}
									selectProduct = {this.handleSelectProduct.bind(this)}
								/>
							</div>
						</div>
					)}
					</section>
				</section>

			</div>
		)
	}
}

const mapStateToProps = (state,props)=>{
    return{
		school : state.user.school,
		shoppingUser : state.shoppingUser
    }
}


const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		},
		handleSaveUser(user){
			dispatch(action_addShoppingUser(user))
		},
		handleRemoveUser(){
			dispatch(action_removeShoppingUser())
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Sell);