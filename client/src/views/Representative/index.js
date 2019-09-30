import React,{Component} from 'react';
import {Route,Switch} from "react-router-dom";
import history from '../../routes/history';
import {connect} from 'react-redux';
import Head from './Head';
import Drawer from './Drawer';
import AddProducts from '../../components/AddProducts'
import AddRepresented from '../../components/AddRepresented';
import Shopping from '../../components/Shopping';
import Order from '../../components/Order';
import History from '../../components/History/';
import NoMatch from '../../components/NoMatch';
import {
	action_logout,
	action_balance
} from '../../actions/user';
import {findBalance} from '../../services/api';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Representative extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modal : false,
			opacity : 0.8
		}
	}

	componentDidMount(){
		this._findBalance();
	}

	async _findBalance(){
		try
		{
			let {_id} = this.props.user;
			let {status,data} = await findBalance(_id);
			if(status==200){
				this.props.handleAddBalance(data.balance);
			}
		}
		catch(err)
		{
			alert(err)
		}

	}

	handleScroll(e){

		this.setState({
      		opacity : e.target.scrollTop > 80 ? 1 : 0.8
      	})
    	
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
			<div className="representative" style={{overflowY: this.state.modal ? 'hidden' : 'auto'}} onScroll={this.handleScroll.bind(this)}>
				
				<img src={bgImg} alt="fondo" className="bg-img" />

				<Head 
					opacity = {this.state.opacity}
					balance = {this.props.user.balance}
					handleDrawer = {(drawer)=>this.setState({drawer})}				
					handleLogout = {this.handleLogout.bind(this)}
				/>

				<Drawer 
					open = {this.state.drawer}
					handleClose = {(drawer)=>this.setState({drawer})}
					handleLogout = {this.handleLogout.bind(this)}
				/>

				<Switch>
					<Route exact path="/representative" component={AddProducts}/> 
					<Route path="/representative/add" component={AddRepresented}/> 
					<Route path="/representative/shopping/:date" component={Shopping}/> 
					<Route path="/representative/orders/:date" component={Order}/> 
					<Route path="/representative/history" component={History}/> 
					<Route component={NoMatch} />
				</Switch>

			</div>
		)
	}
}


const mapStateToProps = (state,props)=>{
    return{
        user : state.user
    }
}


const mapDispatchToProps = dispatch =>{
	return{
		handleLogout (){
			dispatch(action_logout())
		},
		handleAddBalance (balance){
			dispatch(action_balance(balance))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Representative);