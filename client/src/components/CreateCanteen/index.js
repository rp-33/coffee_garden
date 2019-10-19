import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ModalAdd from './ModalAdd';
import ModalDelete from './ModalDelete';
import {findAllSchool,deleteSchool} from '../../services/api';
import CardCanteen from './CardCanteen';
import ModalEditName from './ModalEditName';
import ModalEditAvatar from './ModalEditAvatar';
import {action_toast} from '../../actions/notification';
import './style.css';

class CreateCanteen extends Component{
	constructor(props){
		super(props);
		this.state = {
			modaladd : false,
			modaldelete : false,
			name : '',
			_id : '',
			data : [],
			isLoading : false,
			modalEditName : false,
			modalEditAvatar : false,
			school : {
				_id : '',
				name:'',
				avatar: ''
			}
		}
	}

	componentDidMount(){
		this.getSchool()
	}

	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			if(status === 200)
			{
				this.setState({
					data
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
	}

	handleModalDelete(_id,name){
		this.setState({
			_id,
			name,
			modaldelete : true
		})
	}

	async handleDelete(){
		try
		{
			this.setState({isLoading:true});

			let {data,status} = await deleteSchool(this.state._id);
			this.setState({isLoading:false,modaldelete:false})
			if(status === 204)
			{
				this.setState(previousState =>{
					return{
						data : previousState.data.filter((item,i)=>{
							return previousState._id !== item._id
						})
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
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
		finally
		{
			this.setState({
				modaldelete :false,
				isLoading:false,
			})
		}
	}

	handleSubmit(data){
		
		let {_id,name,avatar} = data;

		this.setState(previousState => {
			return { 
				modaladd : false,
				data : previousState.data.concat({
					_id,
					name,
					avatar
				})
			};
		});
	}

	handleEditNameSuccess(_id,name){
		const index = this.state.data.findIndex(item => item._id === _id);
		this.setState(previoState =>{
			return{
				modalEditName:false,
				data:[
                    ...previoState.data.slice(0,index),// Copia el objeto antes de modificarlo
                    Object.assign({},previoState.data[index], {
                   		name
                    }),
                    ...previoState.data.slice(index + 1)
                ]
			}
		},()=>{
			this.props.handleToast({
				title : 'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleEditAvatarSuccess(_id,avatar){
		const index = this.state.data.findIndex(item => item._id === _id);
		this.setState(previoState =>{
			return{
				modalEditAvatar:false,
				data:[
                    ...previoState.data.slice(0,index),// Copia el objeto antes de modificarlo
                    Object.assign({},previoState.data[index], {
                   		avatar
                    }),
                    ...previoState.data.slice(index + 1)
                ]
			}
		})
	}


	render(){
		return(
			<div className="add-canteen">

				<ModalAdd
					open = {this.state.modaladd}
					handleClose = {(modaladd)=>this.setState({modaladd})}
					handleSubmit = {this.handleSubmit.bind(this)}
				/>

				<ModalDelete 
					name = {this.state.name}
					open = {this.state.modaldelete}
					handleClose = {(modaldelete)=>this.setState({modaldelete})}
					handleDelete = {this.handleDelete.bind(this)}
					isLoading = {this.state.isLoading}
				/>

				{this.state.modalEditName &&
					<ModalEditName 
						open = {this.state.modalEditName}
						handleClose = {(modalEditName)=>this.setState({modalEditName})}
						item = {this.state.school}
						handleSuccess = {this.handleEditNameSuccess.bind(this)}
					/>
				}

				{this.state.modalEditAvatar &&
					<ModalEditAvatar
						open = {this.state.modalEditAvatar}
						handleClose = {(modalEditAvatar)=>this.setState({modalEditAvatar})}
						_id = {this.state.school._id}
						handleSuccess = {this.handleEditAvatarSuccess.bind(this)}
					/>
				}


				<section className="ctn">
					<Fab 
						onClick = {()=>this.setState({modaladd:true})}
						variant="extended" 
						size="large" 
						color="secondary" 
						className="secondary"
						style ={{marginBottom:'20px'}}
					>
        				Crear Cantinas
     				</Fab>
					<div className="panel">
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{this.state.data.map((item,i)=>
								<Grid key={i} item xs={6} sm={4} md={3} lg={2}>

									<CardCanteen 
										item = {item}
										handleModalDelete = {this.handleModalDelete.bind(this)}
										handleModalEditName = {(modalEditName,school)=>this.setState({modalEditName,school})}	
										handleModalEditAvatar = {(modalEditAvatar,school)=>this.setState({modalEditAvatar,school})}																			
									/>

								</Grid>
							)}

						</Grid>

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

export default connect(null,mapDispatchToProps)(CreateCanteen);