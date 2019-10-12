import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalDelete from './ModalDelete';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import {
	createCategory,
	findAllCategory,
	deleteCategory,
	editCategory
} from '../../services/api';
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
			errorAdd :  false,
			index: null,
			_id : ''
		}
	}

	componentDidMount(){
		this.findCategories();
	}

	async findCategories(){
		try
		{
			let {status,data} = await findAllCategory(this.props.match.params.id);
			if(status == 200){
				this.setState({
					categories : data
				})
			}
		}
		catch(err)
		{
			alert(err)
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

			let {status} = await deleteCategory(this.state._id);

			if(status == 204)
			{
				this.setState(previousState =>{
					return{
						modaldelete :false,
						isLoading:false,
						categories : previousState.categories.filter((item,i)=>{
							return previousState._id != item._id
						})
					}
				})
			}

		}
		catch(err)
		{
			this.setState({isLoading:false});
			alert(err);
		}
	}

	async handleEdit (){
		try
		{
			this.setState({isLoading:true});

			let {status} = await editCategory(this.state._id,this.state.inputEdit);

			if(status == 204)
			{
				this.setState(previousState =>{
					return{
						modaledit :false,
						isLoading:false,
						categories:[
                    		...previousState.categories.slice(0,previousState.index),// Copia el objeto antes de modificarlo
                    		Object.assign({}, previousState.categories[previousState.index], {
                   				name: previousState.inputEdit
                    		}),
                    		...previousState.categories.slice(previousState.index + 1)
                		]
					}
				})
			}
		}
		catch(err)
		{
			this.setState({isLoading:false});
			alert(err);
		}
	}

	async handleSave(){
		try
		{


			this.setState({isLoading : true});

			let {status,data} = await createCategory(this.state.inputAdd,this.props.match.params.id);

			if(status == 201)
			{

				let {_id,name,school} = data;

				this.setState(previousState => {
					return { 
						modaladd : false,
						isLoading : false,
						inputAdd : '',
						errorAdd : '',
						categories : previousState.categories.concat({
							_id,
							name,
							school
						})
					};
				});
			}
			else if(status==204)
			{

				this.setState({
					errorAdd : true
				})
			}
		}
		catch(err)
		{	
			alert(err);
		}
		finally
		{
			this.setState({isLoading:false});
		}
	}

	render(){
		return(
			<div className="add-category" style={{overflowY: this.state.modaldelete ? 'hidden !important' : 'hidden'}}>

				<ModalAdd
					open = {this.state.modaladd}
					handleClose = {(modaladd)=>this.setState({modaladd,errorAdd:'',inputAdd:''})}
					value = {this.state.inputAdd}
					error = {this.state.errorAdd}
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

export default CreateCategory;