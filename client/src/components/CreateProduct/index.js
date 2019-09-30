import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import BarChartIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import ListProduct from './ListProduct';
import ModalAddProduct from './ModalAddProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
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
			categories : [],
			product : {
				_id : '',
				name : '',
				category : '',
				position : null,
			},
			modalDelete : false
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

	handleModalDelete({_id,name},position,category){
		this.setState({
			modalDelete : true,
			product : {
				_id,
				name,
				position,
				category
			}
		})
	}

	handleDelete(_id,position){
		this.setState(previousState =>{
			return{
				modalDelete :false,
				categories : [
					...previousState.categories.slice(0,position),
					Object.assign({},previousState.categories[position],{
						products : previousState.categories[position].products.filter((item,i)=>{
							return item._id != _id
						})
					}),
					...previousState.categories.slice(position + 1)
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


				{this.state.modalDelete &&

					<ModalDeleteProduct
						product = {this.state.product}
						open = {this.state.modalDelete}
						handleClose = {(modalDelete)=>this.setState({modalDelete})}
						handleSuccess = {this.handleDelete.bind(this)}
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
									handleDelete = {this.handleModalDelete.bind(this)}
									list = {item.products}
									category = {item.name}
									position = {index}
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
        					Categorias
     					</Fab>
     				</Link>
				</section>
			
				
			</div>
		)
	}
}

export default CreateProduct;