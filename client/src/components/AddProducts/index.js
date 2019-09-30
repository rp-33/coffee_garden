import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ModalProduct from './ModalProduct';
import ListProduct from './ListProduct';
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

class AddProducts extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories : [],
			drawer : false,
			modal : false,
			quantity : 1,
			selectDate : weekDay()[0],
			productDetails:{
				image : null,
				price : null,
				name : ''
			}
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

		let position = this.props.cart.findIndex(item=>{
			return item.image == productDetails.image
		})

		if(position==-1)
		{

			this.props.handleAddCart({
				date : selectDate.date,
				quantity,
				name : productDetails.name,
				price : productDetails.price,
				image : productDetails.image
			})
		}
		else
		{
			this.props.handleIncrProduct({
				position,
				quantity
			})
		}

		this.setState({
			modal:false,
			quantity : 1
		});
	}

	render(){

		let shopping = searchProducts(this.props.cart,this.state.selectDate.date);

		return(
			<div className="add-products">

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
						{shopping
						?
							<Link to= {`/${this.props.rol}/shopping/${shopping}`}>
								<Fab 
                        			variant="extended" 
                        			size="large"
                        			color="secondary" 
                        			className="secondary" 
                        			style={{marginTop:'20px'}}
                        		>
                           			ver compras
                        		</Fab>
                        	</Link>
						:
							<h2>No dispones de compras</h2>
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
					<Link to= {`/${this.props.rol}/orders/${this.state.selectDate.date}`}>
						<Fab 
                        	variant="extended" 
                        	size="large"
                        	color="secondary" 
                        	className="secondary" 
                        	style={{marginTop:'20px'}}
                        >
                           	ver ordenes de hoy
                        </Fab>
                    </Link>
					
				</section>

			</div>
		)
	}
}

const mapStateToProps = (state,props)=>{
    return{
    	rol : state.user.rol,
        school : state.user.school,
        cart : state.cart.shopping
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleAddCart(payload){
			dispatch(action_addCart(payload))
		},
		handleIncrProduct(payload){
			dispatch(action_incrProduct(payload))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AddProducts);