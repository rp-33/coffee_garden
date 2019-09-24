import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import DoneIcon from '@material-ui/icons/Done';
import ModalProduct from './ModalProduct';
import ListProduct from './ListProduct';
import {
	findAllProducts
} from '../../services/api';
import {weekDay} from '../../utils/date';
import './style.css';

class AddProducts extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories : [],
			drawer : false,
			modal : false,
			quantity : 1,
			isLoading : false,
			selectDate : weekDay()[0],
			productDetails:{
				image : null,
				price : null,
				name : ''
			}
		}
	}

	componentDidMount(){
		this.getProducts(this.props.user.school);
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

	}

	render(){
		return(
			<div className="add-products">

				{this.state.modal &&
					<ModalProduct 
						open = {this.state.modal}
						isLoading = {this.state.isLoading}
						product = {this.state.productDetails}
						quantity = {this.state.quantity}
						handleAddQuantity = {this.handleAddQuantity.bind(this)}
						handleDecreaseQuantity = {this.handleDecreaseQuantity.bind(this)}
						handleClose = {(modal)=>this.setState({modal})}
						handleSave = {this.handleSaveProduct.bind(this)}
					/>
				}

				<section className="ctn">
					<div className="ctn-date">
                        {weekDay().map((item,i)=>
                            <div key={i} onClick = {()=>this.setState({selectDate:item})}>
                            	<Fade in = {this.state.selectDate.date == item.date}>
                            		<DoneIcon 
                            			color="secondary"
                            			style={{position:'absolute',top:'1px',right:'1px'}}
                            		/>
                            	</Fade>
                            	<span>{item.day}</span>
                            </div>
                        )}                 
					</div>
					<div style={{marginLeft:'10px'}}>
						<h2>No dispones de compras</h2>
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
        user : state.user,
        cart : state.cart.shopping
    }
}


export default connect(mapStateToProps,null)(AddProducts);