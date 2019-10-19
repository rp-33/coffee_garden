import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	findAllSchool,
	findAllShopping
} from '../../services/api';
import {
	todayDate,
	formatDate
} from '../../utils/date';
import {
	priceOrder
} from '../../utils/price';
import {action_toast} from '../../actions/notification';
import './style.css';

class Statistics extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			initDate : todayDate().init,
			endDate : todayDate().end,
			data : [],
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
				title : 'Error',
				variant : 'error',
				open : true
			})
		}
	}

	handleSelectShool(event){
		let school = event.target.value;
		this.setState({
			school,
			data : []
		})
	}

	handleChange(event){
		let {name,value} = event.target;
		this.setState({
			[name] : value
		})
	}

	async handleFind(){
		try
		{
			this.setState({
				isLoading:true
			})
			let {school,initDate,endDate} = this.state;
			let {status,data} =  await findAllShopping(school,initDate,endDate);
			if(status === 200)
			{
				this.setState({
					data
				})
			}
			else if(status === 204)
			{
				this.setState({
					data : []
				},()=>{
					this.props.handleToast({
						title : 'No se encuentran ordenes',
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
			else{
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
		finally
		{
			this.setState({
				isLoading:false
			})
		}
	}


	render(){
		return(
			<div className="statistics">
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
						{this.state.school !="seleccione una cantina" &&
						<div>
							<div style={{marginBottom:'10px'}}>
								<input 
									placeholder = "fecha inicial"
									type="date"
									value = {this.state.initDate}
									name="initDate"
									onChange={this.handleChange.bind(this)}
									className="form-control"
								/> 
								<span style={{margin:'0 5px'}}>hasta</span>
								<input 
									placeholder = "fecha final"
									type="date"
									value = {this.state.endDate}
									name="endDate"
									onChange={this.handleChange.bind(this)}
								/> 
							</div>
							{(this.state.initDate && this.state.endDate) &&
							<div>
								{!this.state.isLoading
								?
       								<Fab 
       									onClick = {this.handleFind.bind(this)}
       									color="secondary" 
    									className="secondary"
    									variant="extended" 
                        				size="large"
       								>
       									BUSCAR
       								</Fab>
       							:
       								<CircularProgress 
       									style={{marginLeft:'25px'}}
       									color="secondary"
       								/>
       							}
       						</div>
       						}
      					</div>
      					}

      					{this.state.data.map((item,i)=>
						<section key = {i} className="ctn-shopping">
							<div className="cnt-vouched">
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
         					<div className="total">
         						<span>{priceOrder(item.products)}</span>
         					</div>
         				</section>
						)}
						

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

export default connect(null,mapDispatchToProps)(Statistics);