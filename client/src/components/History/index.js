import React,{Component} from 'react';
import {connect} from 'react-redux';
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
			result :  true
		}
	}


	componentDidMount(){
		this._findAllOrders();
	}

	async _findAllOrders(){
		try
		{
			let {status,data} = await findAllHistory(this.props.user);
			if(status === 200)
			{
				this.setState({
					orders:data
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
				this.props.handleErrorServer({
					title : 'error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleErrorServer({
					title : data.error,
					variant : 'error',
					open : true
				})
			}
		}
		catch(err)
		{
			this.props.handleErrorServer({
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
		handleErrorServer(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(History);