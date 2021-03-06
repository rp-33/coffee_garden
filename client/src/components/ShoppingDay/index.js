import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import {
	findAllSchool,
	queryShoppingDay,
	packOffOrder
} from '../../services/api';
import {todayDate} from '../../utils/date';
import {action_toast} from '../../actions/notification';
import './style.css';

class ShoppingDay extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			shoppings : [],
			date :  todayDate().init,
			isLoading : false
		}
	}

	componentDidMount(){
		this.getSchool();
	}

	async getSchool(){
		try
		{
			let {status,data} = await findAllSchool();

			if(status === 200)
			{
				this.setState({
					schools : data
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

	handleSelectShool(event){
		let school = event.target.value;
		this.setState({
			school,
			shoppings : []
		})
	}


	handleChange(event){
		let {name,value} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handleQuery(){
		try
		{
			this.setState({isLoading:true});
			let {date,school} = this.state;
			let {status,data} = await queryShoppingDay(school,date,0);
			if(status === 200)
			{
				this.setState({
					shoppings :	data
				})
			}
			else if(status === 204)
			{
				this.setState({
					shoppings:[]
				},()=>{
					this.props.handleToast({
						title : 'No hay compras',
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
		finally
		{
			this.setState({
				isLoading:false
			})
		}
	}

	async handlePackOffOrder(index,{school,vouched,date,products}){
		try
		{
			let {status,data} = await packOffOrder(school,vouched,date,products); 
			if(status === 204)
			{
				this.setState(prevState=>{
					return{
						shoppings:[
							...prevState.shoppings.slice(0,index),// Copia el objeto antes de modificarlo
							Object.assign({}, prevState.shoppings[index], {
								status : true
							}),
							...prevState.shoppings.slice(index + 1)
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

	async handleMoreData(){
		try
		{
			let {date,school,shoppings} = this.state;
			let {status,data} = await queryShoppingDay(school,date,shoppings.length);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						shoppings : prevState.shoppings.concat(data)
					}
				})
			}
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'No hay mas compras',
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
			<div className="shopping-day">
				<section className="ctn">
					<div className="ctn-cantina">
						<select
							required
							className="select"
							placeholder="seleccione una cantina"
          					value={this.state.school}
          					onChange = {this.handleSelectShool.bind(this)}
        				>
        					<option disabled value="seleccione una cantina">seleccione una cantina</option>
        					{
        						this.state.schools.map((item,i)=>
        							<option 
        								value={item._id}      								
        							>
        								{item.name}
        							</option>
        					)}
        				</select>
					</div>

					<div className="panel">

						{this.state.school !== "seleccione una cantina" &&

						<div className="ctn-input">
							<input 
								value = {this.state.date}
								type ="date"
								name = "date"
								onChange = {this.handleChange.bind(this)}
							/>
							{this.state.isLoading
							?
       					 		<CircularProgress 
       					 			size={20} 
       					 			color="secondary" 
       					 			style={{margin:'0 14px'}} 
       					 		/>
       						:
       							<Fab
       								onClick = {this.handleQuery.bind(this)}
       								color="secondary" 
       								className="secondary"
       							>
       								<SearchIcon/>
       							</Fab>
							}
						</div>
						}

						{this.state.shoppings.map((item,i)=>
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
						{this.state.shoppings.length>1 &&
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

const mapDispatchToProps = dispatch =>{
	return{
		handleToast(payload){
			dispatch(action_toast(payload))
		}
	}
}

export default connect(null,mapDispatchToProps)(ShoppingDay);