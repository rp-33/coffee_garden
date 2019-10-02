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
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../../assets/logo.png';


const Head = ({opacity,handleLogout})=>{
	return(
		<AppBar position="fixed" className="head" style={{opacity}}>
			<Toolbar>
				<img src={logo} alt="logo" className="logo" />
				<div className="right">
					<Link to="/seller/">
						<Tooltip title="cargar compras" aria-label="lonchera">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
       							<ShoppingBasketIcon style={{color:'#fab54f'}}/>
   							</Fab>
   						</Tooltip>
    				</Link>
    				<Link to="/seller/find">
						<Tooltip title="buscar pedido" aria-label="lonchera">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
       							<SearchIcon style={{color:'#fab54f'}}/>
   							</Fab>
   						</Tooltip>
    				</Link>
    				<Tooltip title="cerrar session" aria-label="close">
      					<Fab onClick = {()=>handleLogout()} aria-label="add-balance" size="small" style={{backgroundColor:'white',marginLeft:10}}>
       						<PowerIcon style={{color:'#fab54f'}}/>
      					</Fab>
      				</Tooltip>
      			</div>
        	</Toolbar>
		</AppBar>
	)
}

Head.propTypes = {
	opacity : PropTypes.number.isRequired,
	handleLogout : PropTypes.func.isRequired
}

export default Head;