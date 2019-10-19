import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	queryOrder,
	packOffOrder
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import {formatDate} from '../../utils/date';
import './style.css';

class FindOrder extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			input:'',
			date : '',
			vouched : '',
			status : null,
			products : [],
			school : '',
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
			let {vouched,date,products,school} = this.state;
			let {status,data} = await packOffOrder(school,vouched,date,products); 
			if(status === 204)
			{
				this.setState({
					status : true
				})
			}
			else if(status === 500)
			{
				this.props.handleErrorServer({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleErrorServer({
					title :  data.error,
					variant : 'warnin',
					open : true
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

	async handleQueryOrder(){
		try
		{
			this.setState({
				isLoading : true
			})
			let {status,data} = await queryOrder(this.state.input);

			if(status === 200)
			{
				let {status,vouched,date,products,school} = data;
				this.setState({
					status,
					vouched,
					date,
					products,
					school
				})
			}
			else if(status === 404)
			{
				this.props.handleErrorServer({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}
			else if(status === 500){
				this.props.handleErrorServer({
					title : 'Error en el servidor',
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
		finally
		{
			this.setState({
				isLoading:false,
				input : ''
			})
		}
	}

	render(){
		return(
			<div className="find-order">
				<section className="ctn">
					
					<div className="panel">
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
       						<Fab 
       							disabled={this.state.input.length!==6} 
       							color="secondary" 
       							className="secondary"
       							onClick={this.handleQueryOrder.bind(this)}
       						>
       							<SearchIcon/>
       						</Fab>
						}
					</div>
						{this.state.products.length!==0 &&
						<section>
							<div className="date">
								<h3 style={{color:'#f5722a'}}>
									{formatDate(this.state.date)}
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
         						<div className="left" style={{fontWeight:'bold'}}>
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


export default connect(null,mapDispatchToProps)(FindOrder);