import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const Toast = ({open,title,handleClose,handleAction})=>{

	return(
		<Snackbar
        	anchorOrigin={{
          	vertical: 'bottom',
          	horizontal: 'left',
        	}}
        	open={open}
        	onClose={handleClose}
        	ContentProps={{
          		'aria-describedby': 'message-id',
        	}}
        	message={<span id="message-id">{title}</span>}
        	action={[
          		<Button key="undo" color="secondary" size="small" onClick={()=>handleAction()}>
            		Ver orden
          		</Button>,
          		<IconButton
            		key="close"
            		aria-label="close"
            		color="inherit"
           	 		onClick={handleClose}
          		>
            		<CloseIcon />
          		</IconButton>
       		]}
      	/>
	)

}

Toast.propTypes = {
	open : PropTypes.bool.isRequired,
	title : PropTypes.string.isRequired,
	handleClose : PropTypes.func.isRequired,
	handleAction : PropTypes.func.isRequired
}

export default Toast;