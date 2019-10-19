import React from 'react';
import {Link} from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import UserIcon from '@material-ui/icons/Face';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import SettingIcon from '@material-ui/icons/SettingsApplications';
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
              		<Link to="/representative/add">
              			<ListItem button>                   
               	 			<ListItemIcon>
                  				<UserIcon style={styles.icon} />
                			</ListItemIcon>
                			<ListItemText primary="Representados" />                 
              			</ListItem>
              		</Link>
              		<Link to="/representative/history">
                		<ListItem button>                   
                    		<ListItemIcon>
                    			<ShoppingBasketIcon style={styles.icon} />
                  			</ListItemIcon>
                  			<ListItemText primary="Historial" />                 
                		</ListItem>
              		</Link>
               		<Link to="/representative/voucher/payment">
                		<ListItem button>                   
                    		<ListItemIcon>
                    			<MoneyIcon style={styles.icon} />
                  			</ListItemIcon>
                  			<ListItemText primary="comprobante de pago" />                 
                		</ListItem>
              		</Link>
					<Link to="/representative/edit">
                		<ListItem button>                   
                    		<ListItemIcon>
                    			<SettingIcon style={styles.icon} />
                  			</ListItemIcon>
                  			<ListItemText primary="Configuracion" />                 
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