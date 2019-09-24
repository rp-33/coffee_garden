import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import {findAllRepresented} from '../../services/api';
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
			modaldelete : false
		}
	}

	componentDidMount(){
		this._findAllRepresented();
	}

	async _findAllRepresented(){
		try
		{
			let {status,data} = await findAllRepresented();
			if(status==200){
				this.setState({
					data
				})
			}
		}
		catch(err)
		{
			alert(err)
		}
	}

	openModalDelete(){
		this.setState({
			modaldelete:true
		})
	}

	handleSave(data){
		console.log(data)
		this.setState(previousState=>{
			return{
				modalAdd : false,
				data : previousState.data.concat(data)
			}
		})
	}

	handleDelete(_id){
		this.setState(previousState =>{
			return{
				modaldelete :false,
				data : previousState.data.filter((item,i)=>{
						return _id != item._id
				})
			}
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
						handleClose = {(modaldelete)=>this.setState({modaldelete})}this
						handleSuccess = {this.handleDelete.bind(this)}
					/>
				}

				<section className="ctn">
					<h2>Representados</h2>
					<div className="panel">
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{this.state.data.map((item,i)=>
								<Grid item 
									xs={6} 
									sm={4}
									md={3} 
									lg={2} 
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
											<IconButton aria-label="delete" color="secondary" onClick = {this.openModalDelete.bind(this)}><DeleteIcon fontSize="medium" /></IconButton>		
										</div>
									</Paper>

								</Grid>
							)}

						</Grid>
					    <Fab onClick = {()=>this.setState({modalAdd:true})} size="medium" color="secondary" aria-label="add" className="btn">
          					<AddIcon />
        				</Fab>
						
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

export default connect(mapStateToProps,null)(AddRepresented);