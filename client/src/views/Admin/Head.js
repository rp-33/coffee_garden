import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import FaceIcon from '@material-ui/icons/Face';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';


const Head = ({handleDrawer,opacity,handleLogout})=>{
	return(
		<AppBar position="fixed" className="head" style={{opacity}}>
			<Toolbar>
				<img src={logo} alt="logo" className="logo" />
				<Hidden xsDown>
					<div className="right">
						<Link to="/admin/">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        						<ShoppingBasketIcon style={{color:'#fab54f'}}/>
      						</Fab>
      					</Link>
						<Link to="/admin/search">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        						<FaceIcon style={{color:'#fab54f'}}/>
      						</Fab>
      					</Link>
      					<Fab onClick = {()=>handleLogout()} aria-label="add-balance" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<PowerIcon style={{color:'#fab54f'}}/>
      					</Fab>
      				</div>
				</Hidden>
				<Hidden smUp>
					<div className="right">
						<IconButton aria-label="menu" style={{color:'#fbad31'}} onClick={()=>handleDrawer(true)}>
        					<MenuIcon />
      					</IconButton>
      				</div>
				</Hidden>

        	</Toolbar>
		</AppBar>
	)
}

Head.propTypes = {
	handleDrawer : PropTypes.func.isRequired,
	opacity : PropTypes.number.isRequired,
	handleLogout : PropTypes.func.isRequired
}

export default Head;