import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Head from '../../presentation/HeadAdmin';
import Drawer from '../../presentation/DrawerAdmin';
import ModalAdd from './ModalAdd';
import ModalDelete from './ModalDelete';
import bgImg from '../../assets/background.jpg';
import './style.css';


class AddCanteen extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modaladd : false,
			modaldelete : false
		}
	}

	handleModalDelete(){
		this.setState({
			modaldelete : true
		})
	}

	render(){
		return(
			<div className="add-canteen">

				<ModalAdd
					open = {this.state.modaladd}
					handleClose = {(modaladd)=>this.setState({modaladd})}
				/>

				<ModalDelete 
					open = {this.state.modaldelete}
					handleClose = {(modaldelete)=>this.setState({modaldelete})}
				/>

				<img src={bgImg} alt="fondo" className="bg-img" />

				<Head 
					opacity = {0.8}
					handleDrawer = {(drawer)=>this.setState({drawer})}
				/>

				<Drawer 
					open = {this.state.drawer}
					handleClose = {(drawer)=>this.setState({drawer})}
				/>
				<section className="ctn">
					<h2>Cantinas</h2>
					<div className="panel">
						<Grid container style={{flexGrow: 1}} spacing={2}>
							{[1,2].map((item,i)=>
								<Grid item xs={6} sm={4} md={3} lg={2}>

									<Paper className="item-grid">
										<div className="inf-user">
											<img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/main_element/public/media/image/2019/08/will-smith.jpg?itok=O1RBdn3T" alt="avatar"/>
											<span>name lastName</span>
										</div>
										<div className="ctn-icon-option">
											<IconButton aria-label="edit" color="primary"><EditIcon fontSize="medium" /></IconButton>	
											<IconButton onClick = {this.handleModalDelete.bind(this)} aria-label="delete" color="secondary"><DeleteIcon fontSize="medium" /></IconButton>		
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

export default AddCanteen;