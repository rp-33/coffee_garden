import React,{Component} from 'react';
import {Route,Switch} from "react-router-dom";
import history from '../../routes/history';
import {connect} from 'react-redux';
import Head from './Head';
import FindOrder from '../../components/FindOrder';
import Sell from '../../components/Sell';
import NoMatch from '../../components/NoMatch';
import {action_logout} from '../../actions/user';
import bgImg from '../../assets/background.jpg';
import './style.css';


class Seller extends Component{

	handleLogout (){
		this.setState({
			drawer:false
		});
		this.props.handleLogout();
		history.push('/');
	}

	render(){
		return(
			<div className="seller">

				<img src={bgImg} alt="fondo" className="bg-img" />

				<Head 	
					handleDrawer = {(drawer)=>this.setState({drawer})}
					handleLogout = {this.handleLogout.bind(this)}
				/>

				<Switch>
					<Route exact path="/seller" component={Sell}/> 
					<Route path="/seller/find" component={FindOrder}/> 
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

export default connect(null,mapDispatchToProps)(Seller);

