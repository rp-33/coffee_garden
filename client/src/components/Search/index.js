import React,{Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import ItemUser from './ItemUser';
import ModalBalance from './ModalBalance';
import {
	findAllSchool,
	findAllRepresentative,
	queryUser
} from '../../services/api';
import './style.css';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			users : [],
			modalBalance : false,
			error :false,
			cedula : '',
			user : {
				_id : '',
				balance : ''
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

			if(status==200){
				this.setState({
					schools : data
				})
			}
		}
		catch(err)
		{
			console.log(err);
		}
	}

	async _findAllUsers(school){
		try
		{
			let {status,data} =  await findAllRepresentative(school);
			if(status==200)
			{
				this.setState({
					users : data
				})
			}else{
				this.setState({
					users : []
				})
			}
		}
		catch(err)
		{
			alert(err)
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
			modalBalance:true,
			user : {
				_id,
				balance
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
			let {value} = event.target;
			let {status,data} = await queryUser(this.state.cedula);
			if(status == 200){
				this.setState({
					users : data
				})
			}else if(status==404){
				this.setState({
					error :true,
					users : []
				})
			}

		}
		catch(err)
		{
			alert(err)
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
	}

	render(){
		return(
			<div className="search">
				{this.state.modalBalance &&
					<ModalBalance 
						open = {this.state.modalBalance}
						handleClose = {(modalBalance)=>this.setState({modalBalance})}
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
						{this.state.school == 'seleccione una cantina' 
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
       								<IconButton disabled={this.state.cedula.length==0} aria-label="search" onClick={this.handleQueryUser.bind(this)}>
          								<SearchIcon />
       							 	</IconButton>
								}
							</div>
						}

						{this.state.error &&
							<h4>no hubo coincidencia</h4>
						}

						<section style={{marginTop:'40px'}}>
							<div className="ctn-grid">
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>cedula</div>
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>nombre y apellido</div>
								<div style={{color:'#e44a4c',fontWeight:'bold'}}>saldo</div>
								<div/>
							</div>
							{
							this.state.users.map((item,i)=>
								<ItemUser 
									key = {i}
									item = {item}
									handleBalance = {this.handleBalance.bind(this)}
								/>
								
							)}
						</section>
					</div>
				</section>
			</div>
		)
	}
}

export default Search;