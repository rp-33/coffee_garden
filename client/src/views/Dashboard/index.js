import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Head from '../../presentation/HeadRepresented';
import ListProduct from './ListProduct';
import Drawer from '../../presentation/DrawerRepresented';
import ModalProduct from './ModalProduct';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modal : false,
			quantity : 1,
			opacity : 0.8
		}
	}

	handleAddQuantity(){
		this.setState(prevState=>{
			return{
				quantity : prevState.quantity + 1
			}
		})
	}


	handleDecreaseQuantity(){
		this.setState(prevState=>{
			return{
				quantity : prevState.quantity + -1
			}
		})
	}

	handleScroll(e){

		this.setState({
      		opacity : e.target.scrollTop > 80 ? 1 : 0.8
      	})
    	
	}


	render(){
		return(
			<div className="dashboard" style={{overflowY: this.state.modal ? 'hidden' : 'auto'}} onScroll={this.handleScroll.bind(this)}>

				<img src={bgImg} alt="fondo" className="bg-img" />

				<ModalProduct 
					open = {this.state.modal}
					quantity = {this.state.quantity}
					handleAddQuantity = {this.handleAddQuantity.bind(this)}
					handleDecreaseQuantity = {this.handleDecreaseQuantity.bind(this)}
					handleClose = {(modal)=>this.setState({modal})}
				/>
				<Head 
					opacity = {this.state.opacity}
					handleDrawer = {(drawer)=>this.setState({drawer})}
				/>

				<Drawer 
					open = {this.state.drawer}
					handleClose = {(drawer)=>this.setState({drawer})}
				/>

				<section className="ctn">
					<div className="ctn-date">
                            {['l','m','m','j','v'].map((label,i)=>
                                <div>{label}</div>
                            )}
                        
					</div>
					<section className="panel">
					{[1,2,3,4,5,6,7].map((item,index)=>

						<div className="ctn-product">
							<div className="type">
								<span>Comidas</span>
							</div>
							<div className="item-product">
								<ListProduct 
									list = {[1,2,3,4]}
									handleOpen = {(modal)=>this.setState({modal,quantity:1})}
								/>
							</div>
						</div>
					)}
					</section>
					<Fab type="submit" variant="extended" size="large" fullWidth color="secondary" className="secondary" style={{marginTop:'20px'}}>
        				añadir a lonchera
     				</Fab>
				</section>
			
				
			</div>
		)
	}
}

export default Dashboard;