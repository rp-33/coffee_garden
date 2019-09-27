import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import SettingIcon from '@material-ui/icons/SettingsApplications';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

class ItemUser extends Component{
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

	render(){

		let {item} = this.props;

		return(
			<div className="ctn-grid">
				<div>{item.ci}</div>
				<div>{item.names} {item.lastNames}</div>
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
							</div>
						</div>
					</Fade>

				</div>
			</div>
		)
	}
}

export default ItemUser