import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';

const Drawer = ({open,handleClose})=>{

	return(
		<SwipeableDrawer
        	anchor="right"
        	open={open}
        	onClose={()=>handleClose(false)}
      	>
        	<div className="drawer">
        		<List>
        			<ListItem button>
        				<ListItemIcon>
          					<SendIcon style={styles.icon} />
        				</ListItemIcon>
        				<ListItemText primary="item 1" />
      				</ListItem>
      				<ListItem button>
        				<ListItemIcon>
          					<SendIcon  style={styles.icon} />
        				</ListItemIcon>
        				<ListItemText primary="item 1" />
      				</ListItem>
      				<ListItem button>
        				<ListItemIcon>
          					<SendIcon style={styles.icon} />
        				</ListItemIcon>
        				<ListItemText primary="item 1" />
      				</ListItem>
      				<ListItem button>
        				<ListItemIcon>
          					<SendIcon style={styles.icon} />
        				</ListItemIcon>
        				<ListItemText primary="item 1" />
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
	handleClose : PropTypes.func.isRequired
}

export default Drawer;