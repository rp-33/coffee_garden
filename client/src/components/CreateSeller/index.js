import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import NoData from '../../presentation/NoData';
import {
 findAllSeller
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import sellerImg from '../../assets/seller.png';
import './style.css';

class CreateSeller extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : [],
			selectUser : {
				_id : '',
				names : '',
				lastNames : '',
				avatar : null
			},
			modalAdd : false,
			modaldelete : false,
			result : true
		}
	}

	componentDidMount(){
		this._getSellers(this.props.match.params.school);
	}

	async _getSellers(school){
		try
		{
			let {status,data} = await findAllSeller(school);
			
			if(status === 200)
			{
				this.setState({
					data
				})
			}
			else if(status === 204)
			{
				this.setState({
					result : false
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
	}

	openModalDelete(item){
		this.setState({
			selectUser : item,
			modaldelete:true
		})
	}

	handleSave(data){
		this.setState(previousState=>{
			return{
				result : true,
				modalAdd : false,
				data : previousState.data.concat(data)
			}
		},()=>{
			this.props.handleToast({
				title:'Guardado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleDelete(_id){
		this.setState(previousState =>{
			return{
				modaldelete :false,
				data : previousState.data.filter((item,i)=>{
					return _id !== item._id
				}),
				result : (previousState.data.length - 1 === 0) ? false : true
			}
		},()=>{
			this.props.handleToast({
				title:'Eliminado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleError(title,variant){
		this.setState({
			modaldelete : false
		},()=>{
			this.props.handleToast({
				title,
				variant,
				open : true
			})
		})
	}

	render(){
		return(
			<div className="create-seller">

				{this.state.modalAdd &&
					<ModalAddUser
						school = {this.props.match.params.school}
						open = {this.state.modalAdd}
						handleSave = {this.handleSave.bind(this)}
						handleClose = {(modalAdd)=>this.setState({modalAdd})}
					/>
				}

				{this.state.modaldelete &&
					<ModalDeleteUser 
						user = {this.state.selectUser}
						open = {this.state.modaldelete}
						handleClose = {(modaldelete)=>this.setState({modaldelete})}this
						handleSuccess = {this.handleDelete.bind(this)}
						handleError = {this.handleError.bind(this)}
					/>
				}

				<section className="ctn">
					<Fab 
						onClick = {()=>this.setState({modalAdd:true})} 
						variant="extended" 
						size="large" 
						color="secondary" 
						className="secondary"
						style ={{marginBottom:'20px'}}
					>
        				Crear Vendedores
     				</Fab>

					<div className="panel">

						{!this.state.result &&
							<NoData 
								message = "No hay vendedores"
							/>
						}

						<Grid container style={{flexGrow: 1}} spacing={2}>
							{this.state.data.map((item,i)=>
								<Grid item 
									xs={6} 
									sm={4}
									md={3} 
									lg={2} 
								>

									<Paper className="item-grid">
										<div className="inf-user">
											<div className="ctn-avatar">
											{item.avatar
												?
													<img src={item.avatar} alt="avatar"/>
												:
													<img src={sellerImg} alt="avatar"/>
												}
											</div>
											<p>{item.names} {item.lastNames}</p>
										</div>
										<div className="ctn-icon-option">
											<Link to={`/admin/edit/seller/${item._id}`}>
												<IconButton 
													aria-label="edit" 
													color="primary" 
												>
													<EditIcon fontSize="medium" />
												</IconButton>
											</Link>
											<IconButton 
												aria-label="delete" 
												color="secondary" 
												onClick = {this.openModalDelete.bind(this,item)}
											>
												<DeleteIcon fontSize="medium" />
											</IconButton>		
										</div>
									</Paper>

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

export default connect(null,mapDispatchToProps)(CreateSeller);