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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import SettingIcon from '@material-ui/icons/SettingsApplications';
import Tooltip from '@material-ui/core/Tooltip';
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
							{balance !== 0
							?
								<span>{balance} Bss</span>
							:
								<span>0.00 bss</span>
							}
						</div>
						<Link to="/representative">	
							<Tooltip title="comprar" aria-label="lonchera">
								<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                					<CartIcon style={{color:'#fab54f'}}/>            					
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Link to="/representative/add">	
      						<Tooltip title="agregar representado" aria-label="representado">
      							<Fab aria-label="representado" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        							<UserIcon style={{color:'#fab54f'}}/>
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Link to="/representative/history">	
							<Tooltip title="historial de compra" aria-label="history">
								<Fab aria-label="history" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                					<ShoppingBasketIcon style={{color:'#fab54f'}}/>     					
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Link to="/representative/voucher/payment">	
							<Tooltip title="comprobante de pago" aria-label="voucher">
								<Fab aria-label="voucher" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                					<MoneyIcon style={{color:'#fab54f'}}/>     					
      							</Fab>
      						</Tooltip>
      					</Link>
						<Link to="/representative/edit">	
							<Tooltip title="Configuracion" aria-label="configuracion">
								<Fab aria-label="voucher" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                					<SettingIcon style={{color:'#fab54f'}}/>     					
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Tooltip 
      						title="Cerrar session" 
      						aria-label="close"
      					>
      						<Fab onClick={()=>handleLogout()} aria-label="config" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        						<PowerIcon style={{color:'#fab54f'}}/>
      						</Fab>
      					</Tooltip>
      				</div>
				</Hidden>
				<Hidden  smUp>
					<div className="right">
						<div className="credit">
							{balance !== 0
							?
								<span>{balance} Bss</span>
							:
								<span>0.00 bss</span>
							}
						</div>
						<Link to="/representative">	
							<Tooltip title="comprar" aria-label="lonchera">
								<IconButton aria-label="seller" >
        							<CartIcon style={{color:'#fab54f'}}/>
      							</IconButton>
      						</Tooltip>
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