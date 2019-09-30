import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import CartIcon from '@material-ui/icons/ShoppingCart';
import UserIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';

const Head = ({handleDrawer,opacity,handleLogout,balance})=>{
	return(
		<AppBar position="fixed" className="head" style={{opacity}}>
			<Toolbar>
				<Link to="/representative">	
					<img src={logo} alt="logo" className="logo" />
				</Link>
				<Hidden  xsDown>
					<div className="right">
						<div className="credit">
							{balance != 0
							?
								<span>{balance} Bss</span>
							:
								<span>0.00 bss</span>
							}
						</div>
						<Link to="/represented">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                				<CartIcon style={{color:'#fab54f'}}/>            					
      						</Fab>
      					</Link>
      					<Link to="/represented/history">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                				<ShoppingBasketIcon style={{color:'#fab54f'}}/>            					
      						</Fab>
      					</Link>
      					<Fab onClick={()=>handleLogout()} aria-label="config" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<PowerIcon style={{color:'#fab54f'}}/>
      					</Fab>
      				</div>
				</Hidden>
				<Hidden  smUp>
					<div className="right">
						<div className="credit">
							{balance != 0
							?
								<span>{balance} Bss</span>
							:
								<span>0.00 bss</span>
							}
						</div>
						<Link to="/represented">	
							<IconButton aria-label="seller" >
        						<CartIcon style={{color:'#fab54f'}}/>
      						</IconButton>
      					</Link>
						<IconButton aria-label="menu" style={{color:'#fbad31'}} onClick={()=>handleDrawer(true)}>
        					<MenuIcon />
      					</IconButton>
      				</div>
				</Hidden>

        	</Toolbar>
		</AppBar>
	)
}

Head.defaultProps = {
 	balance : 0
};

Head.propTypes = {
	handleDrawer : PropTypes.func.isRequired,
	opacity : PropTypes.number.isRequired,
	handleLogout : PropTypes.func.isRequired,
	balance : PropTypes.number.isRequired
}

export default Head;