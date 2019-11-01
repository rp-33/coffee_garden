import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {
	queryOrder,
	packOffOrder,
	queryShoppingDay
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import {
	todayDate
} from '../../utils/date';
import './style.css';

class FindOrder extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			input:'',
			data : []
		}

	}

	componentDidMount(){
		this.handleShoppingDay(this.props.school,todayDate().init,this.state.data.length);
	}

	async handleShoppingDay(school,date,length){
		try
		{			
			let {status,data} = await queryShoppingDay(school,date,length);
			if(status === 200)
			{
				this.setState({
					data: data
				})
			}
			else if(status === 204)
			{
				this.setState({

				},()=>{
					this.props.handleToast({
						title : 'No hay ordenes',
						variant : 'info',
						open : true
					})
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else 
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
			})
		}
	}

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handlePackOffOrder(index,{school,vouched,date,products}){
		try
		{
			let {status,data} = await packOffOrder(school,vouched,date,products); 
			if(status === 204)
			{
				this.setState(previousState=>{
					return{
						data:[
							...previousState.data.slice(0,index),// Copia el objeto antes de modificarlo
							Object.assign({}, previousState.data[index], {
								status : true
							}),
							...previousState.data.slice(index + 1)
						]
					}
				},()=>{
					this.props.handleToast({
						title : 'Despacho exitoso',
						variant : 'success',
						open : true
					})
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
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

	async handleQueryOrder(){
		try
		{
			this.setState({
				isLoading : true
			})
			let {status,data} = await queryOrder(this.state.input);

			if(status === 200)
			{
				this.setState({
					data : data
				})
			}
			else if(status === 404)
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}
			else if(status === 500){
				this.props.handleToast({
					title : 'Error en el servidor',
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
		finally
		{
			this.setState({
				isLoading:false,
				input : ''
			})
		}
	}

	handleAllOrders(){
		this.handleShoppingDay(this.props.school,todayDate().init)
	}

	async handleMoreData(){
		try
		{			
			let {status,data} = await queryShoppingDay(this.props.school,todayDate().init,this.state.data.length);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						data : prevState.data.concat(data)
					}
				})
			}
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'No hay mas ordenes',
					variant : 'info',
					open : true
				})
			}
			else if(status === 500)
			{
				this.props.handleToast({
					title : 'Error en el servidor',
					variant : 'error',
					open : true
				})
			}
			else 
			{
				this.props.handleToast({
					title : data.error,
					variant : 'warnin',
					open : true
				})
			}
		}
		catch(err)
		{
			this.props.handleToast({
				title : 'Error en el servidor',
				variant : 'error',
				open : true
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
					{(this.state.data.length < 2) &&
						<Button onClick={this.handleAllOrders.bind(this)}>Mostrar todos</Button>
					}
					{this.state.data.map((item,i)=>
						<section key = {i} className="ctn-shopping">
							<div style={{textAlign:'right',width:'100%'}}>
								<h4 style={{color:'#e44a4c'}}> Comprobante : {item.vouched} </h4> 						
							</div>
							
							<div className="ctn-vouched">
								<Chip
									icon={<FaceIcon />}
									variant = "outline"
									color = "default"
        							label={`${item.user.names} ${item.user.lastNames}`}
      							/>
								<div>
									{
										item.status
										?
										<span style={{color:'#f26d28'}}>despachado</span>
										:
										<Fab 
                        					variant="extended" 
                        					size="small"
                        					color="secondary" 
                        					className="secondary"
                        					onClick = {this.handlePackOffOrder.bind(this,i,item)}
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
						{this.state.data.length>1 &&
							<div className="btn-more">
								<Button onClick={this.handleMoreData.bind(this)}>Mostrar mas</Button>
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
        school : state.user.school
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(FindOrder);