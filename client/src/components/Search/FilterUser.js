import React,{Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import SettingIcon from '@material-ui/icons/SettingsApplications';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

class FilterUser extends Component{
	constructor(props){
		super(props);
		this.state = {
			open : false
		}
	}

	handleMenu(){
		this.setState(previosState =>{
			return{
				open : !previosState.open
			}
		})
	}

	handleBalance(){
		this.setState({
			open:false
		},()=>{
			this.props.handleBalance(true,this.props.item);
		})
	}

	handleVip(){
		this.setState({
			open:false
		},()=>{
			this.props.handleVip(true,this.props.item);
		})	
	}

	render(){

		let {item,value} = this.props;

		return(
		<Fragment>
			{item.balance<0 &&
			<div className="ctn-grid">
				<div>{item.ci}</div>
				<div>{item.names} {item.lastNames}</div>
				<div>{item.balance}</div>
				<div  
					onClick = {this.handleMenu.bind(this)}
				>
                    <SettingIcon fontSize="small" /> 
                    <Fade in = {this.state.open}>
						<div className="ctn-menu">
							<div className="eyelash"></div>
							<div className="menu">
								<p onClick={this.handleBalance.bind(this)}>Saldo</p>
								<Link  to={`/admin/shopping/representative/${item._id}`}>	
									<p>Compras</p>
								</Link>
								<p onClick={this.handleVip.bind(this)}>VIP</p>
							</div>
						</div>
					</Fade>

				</div>
			</div>
			}
		</Fragment>
		)
	}
}

export default FilterUser