import React,{Component} from 'react';
import {Route,Switch} from "react-router-dom";
import history from '../../routes/history';
import {connect} from 'react-redux';
import Drawer from './Drawer';
import Head from './Head';
import CreateCanteen from '../../components/CreateCanteen';
import CreateCategory from '../../components/CreateCategory';
import CreateProduct from '../../components/CreateProduct';
import ShoppingRepresentative from '../../components/ShoppingRepresentative';
import Search from '../../components/Search';
import NoMatch from '../../components/NoMatch';
import {action_logout} from '../../actions/user';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Admin extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false
		}
	}

	handleLogout (){
		this.setState({
			drawer:false
		});
		this.props.handleLogout();
		history.push('/');

	}

	render(){
		return(
			<div className="admin">

				<img src={bgImg} alt="fondo" className="bg-img" />

				<Head 	
					handleDrawer = {(drawer)=>this.setState({drawer})}
					handleLogout = {this.handleLogout.bind(this)}
				/>

				<Drawer 
					open = {this.state.drawer}
					handleClose = {(drawer)=>this.setState({drawer})}
					handleLogout = {this.handleLogout.bind(this)}
				/>

				<Switch>
					<Route exact path="/admin" component={CreateCanteen}/> 
					<Route path="/admin/category/:id" component={CreateCategory}/> 
					<Route path="/admin/product/:id" component={CreateProduct}/> 
					<Route path="/admin/search" component={Search}/> 
					<Route path="/admin/shopping/representative/:id" component={ShoppingRepresentative}/> 
					<Route component={NoMatch} />
				</Switch>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleLogout (){
			dispatch(action_logout())
		}
	}
}

export default connect(null,mapDispatchToProps)(Admin);