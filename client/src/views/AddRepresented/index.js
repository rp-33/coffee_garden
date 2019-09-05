import React,{Component} from 'react';
import Head from '../../presentation/HeadRepresented';
import Drawer from '../../presentation/DrawerRepresented';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import bgImg from '../../assets/background.jpg';
import './style.css';

class AddRepresented extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modalAdd : false,
			modaldelete : false
		}
	}

	openModalDelete(){
		this.setState({
			modaldelete:true
		})
	}

	render(){
		return(
			<div className="add-represented">

				<img src={bgImg} alt="fondo" className="bg-img" />

				<ModalAddUser
					open = {this.state.modalAdd}
					handleClose = {(modalAdd)=>this.setState({modalAdd})}
				/>

				<ModalDeleteUser 
					open = {this.state.modaldelete}
					handleClose = {(modaldelete)=>this.setState({modaldelete})}
				/>

				<Head 	
					opacity = {0.8}
					handleDrawer = {(drawer)=>this.setState({drawer})}
				/>

				<Drawer 
					open = {this.state.drawer}
					handleClose = {(drawer)=>this.setState({drawer})}
				/>

				<section className="ctn">
					<h2>Representados</h2>
					<div className="panel">
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{[1,2,3,4,5,6,7].map((item,i)=>
								<Grid item xs={6} sm={4} md={3} lg={2}>

									<Paper className="item-grid">
										<div className="inf-user">
											<img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/main_element/public/media/image/2019/08/will-smith.jpg?itok=O1RBdn3T" alt="avatar"/>
											<span>name lastName</span>
										</div>
										<div className="ctn-icon-option">
											<IconButton aria-label="edit" color="primary"><EditIcon fontSize="medium" /></IconButton>	
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

export default AddRepresented;