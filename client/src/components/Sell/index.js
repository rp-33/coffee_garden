import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ModalProduct from './ModalProduct';
import ListProduct from './ListProduct';
import ListShopping from './ListShopping';
import ModalPay from './ModalPay';
import {
	findAllProducts
} from '../../services/api';
import {weekDay} from '../../utils/date';
import {
	action_addCart,
	action_incrProduct
}from '../../actions/cart';
import {searchProducts} from '../../utils/products';
import './style.css';

class Sell extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories : [],
			drawer : false,
			modal : false,
			modalPay :false,
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
		if(status==200){
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
			return item.image == productDetails.image
		})

		if(position==-1)
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
					return i!=index
				})
			}
		})
	}

	handleSuccess(){

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
						products = {this.state.shopping}
						date = {this.state.selectDate.date}
						handleSuccess = {this.handleSuccess.bind(this)}
						handleClose = {(modalPay)=>this.setState({modalPay})}
					/>
				}

				<section className="ctn">
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
								onClick = {()=>this.setState({modalPay:true})}
                        		variant="extended" 
                        		size="large"
                        		color="secondary" 
                        		className="secondary" 
                        		style={{marginTop:'20px'}}
                        	>
                           		procesar compra
                        	</Fab>
						:
							<h2>Procesar compra</h2>
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
        school : state.user.school
    }
}


export default connect(mapStateToProps,null)(Sell);