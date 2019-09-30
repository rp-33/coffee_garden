import React,{Component} from 'react';
import {connect} from 'react-redux';
import {findAllHistory} from '../../services/api';
import './style.css';

class History extends Component{
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
			let {status,data} = await findAllHistory(this.props.user);
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
			<div className="history">
				<section className="ctn">
					<h2>Historial de compras</h2>
					<div className="panel">
						{this.state.orders.map((item,i)=>
						<section key = {i}>
							<div className="cnt-vouched">
								<div>
									<h4> Comprobante : <span style={{color:'#e44a4c'}}> {item.vouched} </span> </h4>						
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
		user : state.user.representative || state.user._id
	}
}

export default connect(mapStateToProps,null)(History);