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
import BarChartIcon from '@material-ui/icons/BarChart';
import CartIcon from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Tooltip from '@material-ui/core/Tooltip';
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
							<Tooltip title="cantinas" aria-label="cantina">
								<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        							<ShoppingBasketIcon style={{color:'#fab54f'}}/>
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Link to="/admin/shopping">	
							<Tooltip title="pedidos diarios" aria-label="cantina">
								<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        							<CartIcon style={{color:'#fab54f'}}/>
      							</Fab>
      						</Tooltip>
      					</Link>
						<Link to="/admin/search">	
							<Tooltip title="representantes" aria-label="representantes">
								<Fab aria-label="representantes" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        							<FaceIcon style={{color:'#fab54f'}}/>
      							</Fab>
      						</Tooltip>
      					</Link>
      					<Link to="/admin/statistics">
							   <Tooltip title="Ventas" aria-label="ventas">
								    <Fab aria-label="ventas" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        							<BarChartIcon style={{color:'#fab54f'}}/>
      							</Fab>
      						</Tooltip>
      					</Link>
                <Link to="/admin/voucher">
                 <Tooltip title="comprobantes de pago" aria-label="ventas">
                    <Fab aria-label="ventas" size="small" style={{backgroundColor:'white',marginLeft:10}}>
                      <MoneyIcon style={{color:'#fab54f'}}/>
                    </Fab>
                  </Tooltip>
                </Link>
      					<Tooltip title="cerrar session" aria-label="close">
      						<Fab onClick = {()=>handleLogout()} aria-label="add-balance" size="small" style={{backgroundColor:'white',marginLeft:10}}>       			
        						<PowerIcon style={{color:'#fab54f'}}/>      						
      						</Fab>
      					</Tooltip>
      				</div>
				</Hidden>
				<Hidden smUp>
					<div className="right">
						<Link to="/admin/">	
							<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        						<ShoppingBasketIcon style={{color:'#fab54f'}}/>
      						</Fab>
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

Head.propTypes = {
	handleDrawer : PropTypes.func.isRequired,
	opacity : PropTypes.number.isRequired,
	handleLogout : PropTypes.func.isRequired
}

export default Head;