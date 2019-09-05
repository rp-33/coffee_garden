import React,{Component} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Head from '../../presentation/HeadAdmin';
import Drawer from '../../presentation/DrawerAdmin';
import ModalDelete from './ModalDelete';
import ModalAdd from './ModalAdd';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Addcategory extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modaldelete : false,
			modaladd : false,
			input : ''
		}
	}

	handleOpenDelete(){
		this.setState({
			modaldelete:true
		})
	}

	render(){
		return(
			<div className="add-category" style={{overflowY: this.state.modaldelete ? 'hidden !important' : 'hidden'}}>

				<ModalAdd
					open = {this.state.modaladd}
					handleClose = {(modaladd)=>this.setState({modaladd})}
					value = {this.state.input}
					handleChange = {(ev)=>this.setState({input:ev.target.value})}
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
					<h2>Categorias del producto</h2>
					<div className="panel">
						<div className="ctn-category">
							{["comidas","bebidas","postres"].map((label,i)=>
								<div className="item-category">
									<div className="icon-close" onClick= {this.handleOpenDelete.bind(this)}>
                        				<CancelIcon fontSize="small" style={{color:'#e44a4c'}}/>
                    				</div>
									<span style={{fontWeight:'bold',textTransform:'capitalize'}}>{label}</span>
								</div>
							)}
						</div>
						 <Fab size="medium" color="secondary" aria-label="add" className="btn" onClick={()=>this.setState({modaladd:true})}>
          					<AddIcon />
        				</Fab>
					</div>
				</section>

			</div>
		)
	}
}

export default Addcategory;