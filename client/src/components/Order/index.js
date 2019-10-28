import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	queryOrder,
} from '../../services/api';
import {formatDate} from '../../utils/date';
import {action_toast} from '../../actions/notification';
import './style.css';

class Sell extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			input:'',
			date : '',
			vouched : '',
			status : null,
			products : []
		}
	}

	componentDidMount(){
		this.handleQueryOrder(this.props.match.params.vouched);
	}


	async handleQueryOrder(vouched){
		try
		{
			let {status,data} = await queryOrder(vouched);
			if(status === 200)
			{
				let {status,vouched,date,products} = data[0];
				this.setState({
					status,
					vouched,
					date,
					products
				})
			}
		}
		catch(err)
		{
			this.props.handleErrorServer({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
	}

	render(){
		return(
			<div className="order">
				<section className="ctn">
					<div className="panel">
						{this.state.products.length!=0 &&
						<section>
							<div className="option">
								<div className="date">
									<h3 style={{color:'#f5722a'}}>
										{formatDate(this.state.date)}
									</h3>
								</div>
								<div className="inf">
									<span style={{color:' #e44a4c',fontWeight:'bold'}}>{this.state.vouched}</span>
								</div>
							</div>
							<div className="ctn-grid" style={{fontWeight:'bold'}}>
         						<div className="left">
         							cant
         						</div>
         						<div className="center" style={{fontWeight:'bold'}}>	
         							producto
         						</div>
         						<div className="right" style={{fontWeight:'bold'}}>
         							precio(bss)
         						</div>
         					</div>
         					{this.state.products.map((product,index)=>
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
						}
					</div>
				</section>
			</div>
		)
	}
}


const mapDispatchToProps = dispatch =>{
	return{
		handleErrorServer(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(null,mapDispatchToProps)(Sell);