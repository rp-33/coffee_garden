import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import {
	findAllSchool,
	findAllShopping
} from '../../services/api';
import {todayDate} from '../../utils/date';
import './style.css';

class Statistics extends Component{
	constructor(props){
		super(props);
		this.state = {
			schools : [],
			school : 'seleccione una cantina',
			initDate : todayDate().init,
			endDate : todayDate().end
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

	handleSelectShool(event){
		let school = event.target.value;
		this.setState({
			school
		})
	}

	handleChange(event){
		let {name,value} = event.target;
		console.log(value)
		this.setState({
			[name] : value
		})
	}

	async handleFind(){
		try
		{
			let {school,initDate,endDate} = this.state;
			let {status,data} =  await findAllShopping(school,initDate,endDate);
			if(status==200){
				console.log(data)
			}
		}
		catch(err)
		{
			alert(err)
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
       						<Fab 
       							onClick = {this.handleFind.bind(this)}
       							color="secondary" 
    							className="secondary"
    							variant="extended" 
                        		size="large"
       						>
       							BUSCAR
       						</Fab>
       						}

      					</div>
      					}
					</div>
				</section>
			</div>
		)
	}
}

export default Statistics;