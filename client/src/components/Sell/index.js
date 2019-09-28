import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	queryOrder,
	packOffOrder
} from '../../services/api';
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

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handlePackOffOrder(){
		try
		{
			let {status,data} = await packOffOrder(this.state.vouched); 
			if(status==204){
				this.setState({
					status : true
				})
			}
		}
		catch(err)
		{

		}
	}

	async handleQueryOrder(){
		try
		{
			let {status,data} = await queryOrder(this.state.input);
			if(status==200)
			{
				let {status,vouched,date,products} = data
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
			alert(err)
		}
	}

	render(){
		return(
			<div className="sell">
				<section className="ctn">
					<div className="ctn-input">
						<input 
							type ="number"
							placeholder="introduzca numero de pedido"
							value = {this.state.input}
							name = "input"
							onChange = {this.handleChange.bind(this)}
						/>
						{this.state.isLoading
						?
       					 	<CircularProgress size={20} color="secondary" style={{margin:'0 14px'}} />
       					:
       						<IconButton 
       							disabled={this.state.input.length!=6} 
       							aria-label="search" onClick={this.handleQueryOrder.bind(this)}
       						>
          						<SearchIcon color={this.state.vouched.length!=6 ? "inherit" : 'secondary'}/>
       					 	</IconButton>
						}
					</div>
					<div className="panel">
						{this.state.products.length!=0 &&
						<section>
							<div className="date">
								<h3 style={{color:'#f5722a'}}>
									{this.state.date}
								</h3>
							</div>
							<div className="inf">
								<div>
									<span style={{fontWeight:'bold'}}>Comprobante : </span>
									<span style={{color:' #e44a4c'}}>{this.state.vouched}</span>
								</div>
								<div>
									{
										this.state.status
										?
										<span style={{color:'#f26d28'}}>despachado</span>
										:
										<Fab 
                        					variant="extended" 
                        					size="small"
                        					color="secondary" 
                        					className="secondary"
                        					onClick = {this.handlePackOffOrder.bind(this)}
                        				>
                           					despachar
                        				</Fab>
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

export default Sell;