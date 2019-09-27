import React,{Component} from 'react';
import {connect} from 'react-redux';
import {findAllOrders} from '../../services/api';
import './style.css';

class Order extends Component{
	constructor(props){
		super(props);
		this.state = {
			orders : []
		}
	}


	componentDidMount(){
		this._findAllOrders();
	}

	async _findAllOrders(){
		try
		{
			let {status,data} = await findAllOrders(this.props.user,this.props.match.params.date);
			if(status==200){
				this.setState({
					orders:data
				})
			}
		}
		catch(err)
		{
			alert(err);
		}
	}

	render(){
		return(
			<div className="order">
				<section className="ctn">
					<span style={{fontSize:'1.5em',fontWeight:'bold'}}>fecha: {this.props.match.params.date}</span>
					<div className="panel">
						{this.state.orders.map((item,i)=>
						<section key = {i}>
							<div className="cnt-vouched">
								<div>
									<h4> Comprobante : <span style={{color:'#e44a4c'}}> {item.vouched} </span> </h4>						
								</div>
								<div>
									{item.status
									?
										<h3 style={{fontWeight:'bold',color:'#f58351'}}> Despachado </h3>
									: 			
										<h3 style={{fontWeight:'bold',color:'#f58351'}}> No despachado </h3>			
									}
								</div>
							</div>
							<div className="ctn-grid">
         						<div className="left">
         							cant
         						</div>
         						<div className="center">	
         							producto
         						</div>
         						<div className="right">
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
		user : state.user._id
	}
}

export default connect(mapStateToProps,null)(Order);