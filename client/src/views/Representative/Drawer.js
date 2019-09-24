import React from 'react';
import {Link} from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import UserIcon from '@material-ui/icons/Face';
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
              <Link to="/represented/add">
              	<ListItem button>                   
               	 		<ListItemIcon>
                  	<UserIcon style={styles.icon} />
                	</ListItemIcon>
                	<ListItemText primary="Representados" />                 
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