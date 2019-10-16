import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	findAllSchool,
	queryShoppingDay
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
			data : [],
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
			this.props.handleErrorServer({
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
			data : []
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

			let {status,data} = await queryShoppingDay(school,date);
			if(status === 200)
			{
				this.setState({
					data
				})
			}
			else if(status === 404)
			{
				this.setState({
					data:[]
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
		finally
		{
			this.setState({
				isLoading:false
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

						{this.state.data.map((item,i)=>
						<section key = {i} className="ctn-shopping">
							<div className="cnt-vouched">
								<div>
									<h4 style={{color:'#e44a4c'}}> Nro : {item.vouched} </h4> 						
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

export default connect(null,mapDispatchToProps)(ShoppingDay);