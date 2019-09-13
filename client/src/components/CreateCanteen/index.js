import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalAdd from './ModalAdd';
import ModalDelete from './ModalDelete';
import {createSchool,findAllSchool,deleteSchool} from '../../services/api';
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
			isLoading : false
		}
	}

	componentDidMount(){
		this.getSchool()
	}

	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();
			if(status==200){
				this.setState({
					data
				})
			}
		}
		catch(err)
		{
			console.log(err);
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
			if(status == 204)
			{
				this.setState(previousState =>{
					return{
						modaldelete :false,
						isLoading:false,
						data : previousState.data.filter((item,i)=>{
							return previousState._id != item._id
						})
					}
				})
			}
		}
		catch(err)
		{

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

				<section className="ctn">
					<h2>Cantinas</h2>
					<div className="panel">
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{this.state.data.map((item,i)=>
								<Grid key={i} item xs={6} sm={4} md={3} lg={2}>

									<Paper className="item-grid">
										<div className="inf-user">
											<Link to= {`/admin/product/${item._id}`}>
												<img src={item.avatar} alt="avatar"/>
											</Link>
											<span>{item.name}</span>
										</div>
										<div className="ctn-icon-option">
											<IconButton aria-label="edit" color="primary">
												<EditIcon fontSize="medium" />
											</IconButton>	
											<IconButton onClick = {this.handleModalDelete.bind(this,item._id,item.name)} aria-label="delete" color="secondary">
												<DeleteIcon fontSize="medium" />
											</IconButton>		
										</div>
									</Paper>

								</Grid>
							)}

						</Grid>
					    <Fab onClick = {()=>this.setState({modaladd:true})} size="medium" color="secondary" aria-label="add" className="btn">
          					<AddIcon />
        				</Fab>
						
					</div>

				</section>
			</div>
		)
	}
}

export default CreateCanteen;