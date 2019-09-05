import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import InformationIcon from '@material-ui/icons/PriorityHigh';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
import './styles/head.css';

const Head = ({handleDrawer,opacity})=>{
	return(
		<AppBar position="fixed" className="head" style={{opacity}}>
			<Toolbar>
				<img src={logo} alt="logo" className="logo" />
				<Hidden  xsDown>
					<div className="right">
						<Fab aria-label="lonchera" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<InformationIcon style={{color:'#fab54f'}}/>
      					</Fab>
      					<Fab aria-label="add-balance" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<InformationIcon style={{color:'#fab54f'}}/>
      					</Fab>
      					<Fab aria-label="add-soon" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<InformationIcon style={{color:'#fab54f'}}/>
      					</Fab>
      					<Fab aria-label="config" size="small" style={{backgroundColor:'white',marginLeft:10}}>
        					<InformationIcon style={{color:'#fab54f'}}/>
      					</Fab>
      				</div>
				</Hidden>
				<Hidden  smUp>
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
	opacity : PropTypes.number.isRequired
}

export default Head;