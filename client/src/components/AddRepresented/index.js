import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import NoData from '../../presentation/NoData';
import {findAllRepresented} from '../../services/api';
import {action_toast} from '../../actions/notification';
import studentImg from  '../../assets/student.png';
import './style.css';

class AddRepresented extends Component{
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
			result:true
		}
	}

	componentDidMount(){
		this._findAllRepresented();
	}

	async _findAllRepresented(){
		try
		{
			let {status,data} = await findAllRepresented();
			if(status === 200)
			{
				this.setState({
					data
				})
			}else if(status === 204)
			{
				this.setState({
					result:false
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
					variant : 'error',
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

	openModalDelete(){
		this.setState({
			modaldelete:true
		})
	}

	handleSave(data){
		this.setState(previousState=>{
			return{
				result :true,
				modalAdd : false,
				data : previousState.data.concat(data)
			}
		},()=>{
			this.props.handleToast({
				title : 'Guardado con exito',
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
				title : 'Se ha eliminado con exito',
				variant : 'success',
				open : true
			})
		})
	}

	handleError(message,variant){
		this.setState({
			modaldelete : false
		},()=>{
			this.props.handleToast({
				title : message,
				variant : variant,
				open : true
			})
		})
	}

	render(){
		return(
			<div className="add-represented">

				{this.state.modalAdd &&
					<ModalAddUser
						school = {this.props.school}
						open = {this.state.modalAdd}
						handleSave = {this.handleSave.bind(this)}
						handleClose = {(modalAdd)=>this.setState({modalAdd})}
					/>
				}

				{this.state.modaldelete &&

					<ModalDeleteUser 
						user = {this.state.selectUser}
						open = {this.state.modaldelete}
						handleClose = {(modaldelete)=>this.setState({modaldelete})}
						handleSuccess = {this.handleDelete.bind(this)}
						handleError = {this.handleError.bind(this)}
					/>
				}

				<section className="ctn">					
					<div style={{width:'100%'}}>
					<Fab 
					    onClick = {()=>this.setState({modalAdd:true})} 
					    variant="extended" 
					    size="large" 
					    color="secondary"  
					    aria-label="add" 
					    className="secondary"
					>
          				crear representado
        			</Fab>
        			</div>
					<div className="panel">
						{!this.state.result &&
							<NoData 
								message="No haz agregado representado"
							/>
						}
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{this.state.data.map((item,i)=>
								<Grid item 
									xs={6} 
									sm={4}
									md={4} 
									lg={3} 
									onClick = {()=>this.setState({selectUser:item})}
								>

									<Paper className="item-grid">
										<div className="inf-user">
											<div className="ctn-avatar">
											{item.avatar
												?
													<img src={item.avatar} alt="avatar"/>
												:
													<img src={studentImg} alt="avatar"/>
												}
											</div>
											<span>{item.names} {item.lastNames}</span>
										</div>
										<div className="ctn-icon-option">
											<Link to={`/represented/edit/representative/${item._id}`}>
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
												onClick = {this.openModalDelete.bind(this)}
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

const mapStateToProps = (state,props)=>{
    return{
        school : state.user.school
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(AddRepresented);