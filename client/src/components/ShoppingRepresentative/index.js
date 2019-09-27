import React,{Component} from 'react';
import {findAllOrdersUser} from '../../services/api';

class ShoppingRepresentative extends Component{
	constructor(props){
		super(props);
		this.state = {
			orders : []
		}
	}

	componentDidMount(){
		this._findAllOrders(this.props.match.params.id);
	}

	async _findAllOrders(user){
		try
		{
			let {status,data} = await findAllOrdersUser(user);
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
										<h3 style={{fontWeight:'bold',color:'#f58351'}}> No Despachado </h3>			
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

export default ShoppingRepresentative;