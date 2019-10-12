import React from 'react';
import {Link} from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BarChartIcon from '@material-ui/icons/BarChart';
import CartIcon from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import PropTypes from 'prop-types';

const Drawer = ({open,handleClose,handleLogout})=>{

	return(
		<SwipeableDrawer
        	anchor="right"
        	open={open}
        	onClose={()=>handleClose(false)}
      	>
        	<div className="drawer">
        		<List>
              <Link to="/admin/shopping">
                <ListItem button>
                  <ListItemIcon>
                      <CartIcon style={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Pedidos diarios" />
                </ListItem>
              </Link>
              <Link to="/admin/search">
                <ListItem button>
                  <ListItemIcon>
                      <FaceIcon style={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Representantes" />
                </ListItem>
              </Link>
              <Link to="/admin/statistics">
                <ListItem button>
                  <ListItemIcon>
                      <BarChartIcon style={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Ventas" />
                </ListItem>
              </Link>
              <Link to="/admin/voucher">
                <ListItem button>
                  <ListItemIcon>
                      <MoneyIcon style={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Comprobantes de pago" />
                </ListItem>
              </Link>
        			<ListItem button onClick = {()=>handleLogout()}>
        				<ListItemIcon>
          					<PowerIcon style={styles.icon} />
        				</ListItemIcon>
        				<ListItemText primary="Salir" />
      				</ListItem>
        		</List>
        	</div>
      	</SwipeableDrawer>

	)

}

const styles = {
  icon : {
    color:'#fbad31'
  }
}

Drawer.propTypes = {
	open : PropTypes.bool.isRequired,
	handleClose : PropTypes.func.isRequired,
  handleLogout : PropTypes.func.isRequired
}

export default Drawer;