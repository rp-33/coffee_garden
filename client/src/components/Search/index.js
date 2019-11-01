import React,{Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import ItemUser from './ItemUser';
import FilterUser from './FilterUser';
import ModalBalance from './ModalBalance';
import ModalVip from './ModalVip';
import {
	findAllSchool,
	findAllRepresentative,
	queryUser
} from '../../services/api';
import {action_toast} from '../../actions/notification';
import './style.css';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			users : [],
			modalBalance : false,
			modalVip : false,
			error :'',
			cedula : '',
			valueDebt : false,
			user : {
				_id : '',
				balance : '',
				vip : ''
			}
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

	async _findAllUsers(school){
		try
		{
			let {status,data} =  await findAllRepresentative(school,0);
			if(status === 200)
			{
				this.setState({
					users : data
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
			else if(status === 204)
			{
				this.setState({
					users : []
				},()=>{
					this.props.handleToast({
						title : 'No hay representantes',
						variant : 'info',
						open : true
					})
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


	handleSelectShool(event){
		let school = event.target.value;
		this.setState({
			school
		},()=>{
			this._findAllUsers(school)
		})
	}

	handleBalance(modalBalance,{_id,balance}){
		this.setState({
			modalBalance,
			user : {
				_id,
				balance
			}
		});
	}

	handleModalVip(modalVip,{_id,vip}){
		this.setState({
			modalVip,
			user : {
				_id,
				vip
			}
		});
	}

	async handleQueryUser(event){
		try
		{
			this.setState({
				isLoading:true,
				error:false
			})
			let {status,data} = await queryUser(this.state.cedula);
			if(status === 200)
			{
				this.setState({
					users : data
				})
			}else if(status === 404)
			{
				this.setState({
					error :true,
					users : []
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

	handleChange(event){
		let {value,name} = event.target;
		this.setState({
			[name] : value
		})
		if(value.length===0)
		{
			this._findAllUsers(this.state.school)
		}
	}

	handleSuccessBalance(_id,balance){
		let position = this.state.users.findIndex(item=>{
			return item._id === _id
		})

		this.setState(prevState=>{
			return {
                ...prevState,
                users : [
                    ...prevState.users.slice(0,position),// Copia el objeto antes de modificarlo
                    Object.assign({}, prevState.users[position], {
                    	balance : balance
                    }),
                    ...prevState.users.slice(position + 1)
                ], 
				modalBalance:false,
           	}
		})
	}

	handleSuccessVip(_id,vip){
		let position = this.state.users.findIndex(item=>{
			return item._id === _id
		});
		
		this.setState(prevState=>{
			return {
                ...prevState,
                users : [
                    ...prevState.users.slice(0,position),// Copia el objeto antes de modificarlo
                    Object.assign({}, prevState.users[position], {
                    	vip : vip
                    }),
                    ...prevState.users.slice(position + 1)
                ], 
				modalVip:false,
           	}
		})
	}

	async handleMoreData(){
		try
		{
			let {school,users} = this.state;
			let {status,data} =  await findAllRepresentative(school,users.length);
			if(status === 200)
			{
				this.setState(prevState=>{
					return{
						users : prevState.users.concat(data)
					}
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
			else if(status === 204)
			{
				this.props.handleToast({
					title : 'No hay mas representantes',
					variant : 'info',
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


	render(){
		return(
			<div className="search">
				{this.state.modalBalance &&
					<ModalBalance 
						open = {this.state.modalBalance}
						handleClose = {(modalBalance)=>this.setState({modalBalance})}
						user = {this.state.user}
						handleSuccess = {this.handleSuccessBalance.bind(this)}
					/>
				}

				{this.state.modalVip &&
					<ModalVip
						open = {this.state.modalVip}
						handleClose = {(modalVip)=>this.setState({modalVip})}
						handleSuccess = {this.handleSuccessVip.bind(this)}
						user = {this.state.user}
					/>
				}

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
						{this.state.school === 'seleccione una cantina' 
						?
							<h3>seleccione una cantina</h3>
						:
							<div className="ctn-input">
								<input 
									placeholder="introduzca cedula de identidad"
									value = {this.state.cedula}
									name = "cedula"
									onChange = {this.handleChange.bind(this)}
								/>
								{this.state.isLoading
								?
       							 	<CircularProgress size={20} color="secondary" style={{margin:'0 14px'}} />
       							:

       								<Fab 
       									style={{marginLeft:'10px'}}
       									disabled={this.state.cedula.length==0} 
       									color="secondary" 
       									className="secondary"
       									onClick={this.handleQueryUser.bind(this)}
       								>
       									<SearchIcon/>
       								</Fab>
								}
							</div>
						}

						{this.state.school !== 'seleccione una cantina' &&
							<div>
								<Switch
        							checked={this.state.valueDebt}  
        							onChange={(event)=>this.setState({valueDebt:event.target.checked})}   							
        							value="valueDebt"
        							inputProps={{ 'aria-label': 'secondary checkbox' }}
     							/>
     							{this.state.valueDebt 
     							?
     								<span>Mostrar todos</span>
     							:
     								<span>Filtrar por morosos</span>
     							}
							</div>
						}

						{this.state.error &&
							<h4>no hubo coincidencia</h4>
						}

						{this.state.users.length>0 &&
						<section style={{marginTop:'40px'}}>
							<div className="ctn-grid">
								<div />
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>cedula</div>
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>nombre y apellido</div>
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>saldo</div>
								<div/>
							</div>
							{
							this.state.users.map((item,i)=>
								this.state.valueDebt
								?
								<FilterUser 
									key = {item._id}
									item = {item}
									handleBalance = {this.handleBalance.bind(this)}
									handleVip = {this.handleModalVip.bind(this)}
								/>
								:
								<ItemUser 
									key = {item._id}
									item = {item}
									handleBalance = {this.handleBalance.bind(this)}
									handleVip = {this.handleModalVip.bind(this)}
								/>
								
							)}
						</section>
						}
						
						{this.state.users.length>1 &&
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

export default connect(null,mapDispatchToProps)(Search);