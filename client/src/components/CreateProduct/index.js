import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import BarChartIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import ListProduct from './ListProduct';
import ModalAddProduct from './ModalAddProduct';
import {
	findAllProducts,
	createProduct
} from '../../services/api';
import './style.css';

class CreateProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			modalAdd :false,
			index : null,
			_id : '',
			categories : []
		}
	}

	componentDidMount(){
		this.getProducts();
	}

	async getProducts(){
		try
		{
			let {status,data} = await findAllProducts(this.props.match.params.id);

			if(status==200){
				this.setState({
					categories:data
				})
			}
		}
		catch(err)
		{
			alert(err)
		}
	}

	modalAddProduct(index,{_id}){
		this.setState({
			index,
			_id,
			modalAdd:true
		})
	}

	handleAddProduct(name,_id,image){
		this.setState(previousState => {
			return { 
				modalAdd: false,
				categories:[
                    ...previousState.categories.slice(0,previousState.index),// Copia el objeto antes de modificarlo
                    Object.assign({}, previousState.categories[previousState.index], {
                   		products : previousState.categories[previousState.index].products.concat({
                   			_id,
                   			name,
                   			image
                   		})
                    }),
                    ...previousState.categories.slice(previousState.index + 1)
                ]
			}
		})
	}

	render(){
		return(
			<div className="create-product" >

				{this.state.modalAdd &&
					<ModalAddProduct
						open = {this.state.modalAdd}
						_id = {this.state._id}
						handleClose = {(modalAdd)=>this.setState({modalAdd})}
						handleSubmit = {this.handleAddProduct.bind(this)}
					/>
				}
				<section className="ctn">

					<div className="options">
						<Link to={`/admin/Statistics/${this.props.match.params.id}`}>
							<Fab aria-label="data" >
       	 						<BarChartIcon />
      						</Fab>
      					</Link>
      				</div>
					<section className="panel">
					{this.state.categories.map((item,index)=>

						<div className="ctn-product">
							<div className="type">
								<span>{item.name}</span>
							</div>
							<div className="item-product">
								<ListProduct 
									list = {item.products}
								/>
								
							</div>
								<div className="add-product" onClick = {this.modalAddProduct.bind(this,index,item)}>
									<span>+</span>
								</div>
						</div>
					)}
					</section>
					<Link to={`/admin/category/${this.props.match.params.id}`}>
						<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary" style={{marginTop:'20px'}}>
        					añadir categoria
     					</Fab>
     				</Link>
				</section>
			
				
			</div>
		)
	}
}

export default CreateProduct;