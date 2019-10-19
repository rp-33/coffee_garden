import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import ModalDelete from './ModalDelete';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import NoData from '../../presentation/NoData';
import {
	createCategory,
	findAllCategory,
	deleteCategory,
	editCategory
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import './style.css';

class CreateCategory extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories : [],
			modaldelete : false,
			modaladd : false,
			editedit : false,
			inputAdd : '',
			inputEdit : '',
			name : '',
			isLoading:false,
			index: null,
			_id : '',
			result :true
		}
	}

	componentDidMount(){
		this.findCategories();
	}

	async findCategories(){
		try
		{
			let {status,data} = await findAllCategory(this.props.match.params.id);
			if(status === 200)
			{
				this.setState({
					categories : data
				})
			}
			else if(status === 204)
			{
				this.setState({
					result : false
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

	handleOpenDelete({_id,name}){
		this.setState({
			name,
		 	_id,
			modaldelete:true
		})
	}

	handleOpenEdit(index,{name,_id}){
		this.setState({
			_id,
			inputEdit : name,
			modaledit:true,
			index
		})
	}

	async handleDelete(){
		try
		{
			this.setState({isLoading:true});

			let {status,data} = await deleteCategory(this.state._id);

			if(status === 204)
			{
				this.setState(previousState =>{
					return{
						categories : previousState.categories.filter((item,i)=>{
							return previousState._id !== item._id
						}),
						result : (previousState.categories.length - 1 === 0) ? false : true
					}
				},()=>{
					this.props.handleToast({
						title : 'Eliminado con exito',
						variant : 'success',
						open : true
					})
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})	
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
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
		finally
		{
			this.setState({
				isLoading:false,
				modaldelete :false
			});
		}
	}

	async handleEdit (){
		try
		{
			this.setState({isLoading:true});

			let {status,data} = await editCategory(this.state._id,this.state.inputEdit);

			if(status === 204)
			{
				this.setState(previousState =>{
					return{
						isLoading:false,
						categories:[
                    		...previousState.categories.slice(0,previousState.index),// Copia el objeto antes de modificarlo
                    		Object.assign({}, previousState.categories[previousState.index], {
                   				name: previousState.inputEdit
                    		}),
                    		...previousState.categories.slice(previousState.index + 1)
                		]
					}
				},()=>{
					this.props.handleToast({
						title : 'Editado con exito',
						variant : 'success',
						open : true
					})
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})	
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
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
		finally
		{
			this.setState({
				modaledit :false,
				isLoading:false
			});
		}
	}

	async handleSave(){
		try
		{


			this.setState({isLoading : true});

			let {status,data} = await createCategory(this.state.inputAdd,this.props.match.params.id);

			if(status === 201)
			{

				let {_id,name,school} = data;

				this.setState(previousState => {
					return { 
						result : true,
						categories : previousState.categories.concat({
							_id,
							name,
							school
						})
					};
				},()=>{
					this.props.handleToast({
						title : 'Guardado con exito',
						variant : 'success',
						open : true
					})
				});
			}
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'Categoria ya existe',
					variant : 'info',
					open : true
				})
			}else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
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
		finally
		{
			this.setState({
				modaladd : false,
				isLoading : false,
				inputAdd : ''
			});
		}
	}

	render(){
		return(
			<div className="add-category" style={{overflowY: this.state.modaldelete ? 'hidden !important' : 'hidden'}}>

				<ModalAdd
					open = {this.state.modaladd}
					handleClose = {(modaladd)=>this.setState({modaladd,inputAdd:''})}
					value = {this.state.inputAdd}
					isLoading = {this.state.isLoading}
					handleChange = {(ev)=>this.setState({inputAdd:ev.target.value})}
					handleSave = {this.handleSave.bind(this)}
				/>

				<ModalEdit
					isLoading = {this.state.isLoading}
					handleEdit = {this.handleEdit.bind(this)}
					open = {this.state.modaledit}
					handleClose = {(modaledit)=>this.setState({modaledit})}
					value = {this.state.inputEdit}
					handleChange = {(ev)=>this.setState({inputEdit:ev.target.value})}
				/>

				<ModalDelete 
					isLoading = {this.state.isLoading}
					value = {this.state.name}
					open = {this.state.modaldelete}
					handleClose = {(modaldelete)=>this.setState({modaldelete})}
					handleDelete = {this.handleDelete.bind(this)}
				/>

				<section className="ctn">
					<h2>Categorias del producto</h2>
					<Fab 
						onClick={()=>this.setState({modaladd:true})}
						variant="extended" 
						size="large" 
						color="secondary" 
						className="secondary"
						style ={{marginBottom:'20px'}}
					>
        				Crear categorias
     				</Fab>
					<div className="panel">
						{!this.state.result &&
							<NoData 
								message = "No existen categorias"
							/>
						}
						<div className="ctn-category">
							{this.state.categories.map((item,i)=>
								<div className="item-category">
									<Link to={`/admin/product/${this.props.match.params.id}`}>
										<span style={{fontWeight:'bold',textTransform:'capitalize',marginRight:'10px'}}>{item.name}</span>
									</Link>
									<EditIcon style={{cursor:'pointer',marginRight:'10px'}} color="primary" fontSize="medium" onClick={this.handleOpenEdit.bind(this,i,item)} />	
									<DeleteIcon style={{cursor:'pointer'}} color="secondary" fontSize="medium" onClick={this.handleOpenDelete.bind(this,item)} />	
								</div>
							)}
						</div>
					</div>
				</section>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(null,mapDispatchToProps)(CreateCategory);