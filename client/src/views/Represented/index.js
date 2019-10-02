import React,{Component} from 'react';
import {Route,Switch} from "react-router-dom";
import history from '../../routes/history';
import {connect} from 'react-redux';
import Head from './Head';
import Drawer from './Drawer';
import AddProducts from '../../components/AddProducts/';
import Shopping from '../../components/Shopping/';
import Orders from '../../components/Orders/';
import Order from '../../components/Order/';
import History from '../../components/History/';
import NoMatch from '../../components/NoMatch';
import Toast from '../../presentation/ToastOrder';
import {
	action_logout,
	action_balance
} from '../../actions/user';
import {findBalance} from '../../services/api';
import socket from '../../services/socket';
import bgImg from '../../assets/background.jpg';
import './style.css';

class Represented extends Component{
	constructor(props){
		super(props);
		this.state = {
			drawer : false,
			modal : false,
			opacity : 0.8,
			toast : false,
			vouched : ''
		}
	}

	
	componentDidMount(){
		this._findBalance();
		this._handleSocket();
	}

	_handleSocket(){
		let {representative} = this.props.user;

		socket.emit('connected',representative);

		socket.on('balance',(payload)=>{
			let {balance,vouched} = payload;
			this.props.handleAddBalance(balance);
			this.setState({
				vouched,
				toast :true
			})
		})
	}

	async _findBalance(){
		try
		{
			let {representative} = this.props.user;
			let {status,data} = await findBalance(representative);
			if(status==200){
				this.props.handleAddBalance(data.balance);
			}
		}
		catch(err)
		{
			alert(err)
		}

	}

	handleLogout (){
		this.setState({
			drawer:false
		});
		this.props.handleLogout();
		history.push('/');
	}

	handleSeeOrder(){
		this.setState({
			toast : false
		},()=>{	
			history.push(`/represented/order/${this.state.vouched}`);
		})
	}

	render(){
		return(
			<div className="represented">
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

				<Toast 
					open = {this.state.toast}
					title = "han realizado una compra"
					date = {this.state.date}
					handleClose = {()=>this.setState({toast:false})}
					handleAction = {this.handleSeeOrder.bind(this)}
				/>

				<Switch>
					<Route exact path="/represented" component={AddProducts}/> 
					<Route path="/represented/shopping/:date" component={Shopping}/> 
					<Route path="/represented/orders/:date" component={Orders}/> 
					<Route path="/represented/order/:vouched" component={Order}/> 
					<Route path="/represented/history" component={History}/> 
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

export default connect(mapStateToProps,mapDispatchToProps)(Represented);
