import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import NoData from '../../presentation/NoData';
import {findAllHistory} from '../../services/api';
import {formatDate} from '../../utils/date';
import {action_toast} from '../../actions/notification';
import './style.css';

class History extends Component{
	constructor(props){
		super(props);
		this.state = {
			orders : [],
			result :  true,
		}
	}


	componentDidMount(){
		this._findAllOrders(this.props.user,this.state.orders.length);
	}

	async _findAllOrders(user,page){
		try
		{
			let {status,data} = await findAllHistory(user,page);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						orders:data
					}
				})
			}
			else if(status === 204)
			{
				this.setState({
					result:false
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'error',
					open : true
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	async handleMoreDate(){
		try
		{
			let {status,data} = await findAllHistory(this.props.user,this.state.orders.length);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						orders:prevState.orders.concat(data)
					}
				})
			}
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'No hay mas datos',
					variant : 'info',
					open : true
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'error',
					open : true
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	render(){
		return(
			<div className="history">
				<section className="ctn">
					<h2>Historial de compras</h2>
					<div className="panel">
						{!this.state.result &&
							<NoData />
						}
						{this.state.orders.map((item,i)=>
						<section key = {i} className="ctn-shopping">
							<div className="cnt-vouched">
								<div>
									<span style={{color:'#e44a4c',fontWeight:'bold'}}> {item.vouched} </span>					
								</div>
								<div>
									<span style={{fontWeight:'bold'}}> {formatDate(item.date)} </span>					
								</div>
							</div>
							<div className="ctn-grid">
         						<div className="left" style={{fontWeight:'bold'}}>
         							cant
         						</div>
         						<div className="center" style={{fontWeight:'bold'}}>	
         							productos
         						</div>
         						<div className="right" style={{fontWeight:'bold'}}>
         							precio(bss)
         						</div>
         					</div>
         					{item.products.map((product,index)=>
         						<div key={index} className="ctn-grid">
         						<div className="left">
         							{product.quantity}
         						</div>
         						<div className="center">	
         							{product.name}
         						</div>
         						<div className="right">
         							{product.price}
         						</div>
         					</div>
         					)}
         				</section>
						)}
						{this.state.result &&
							<div className="btn-more">
								<Button onClick={this.handleMoreDate.bind(this)}>Mostrar mas</Button>
							</div>
						}
					</div>				
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state,props)=>{
	return{
		user : state.user.representative || state.user._id
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(History);