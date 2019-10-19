import React,{Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {action_toast} from '../actions/notification';

class Toast extends Component{
	handleClose(){
		this.props.handleClose({
			title : '',
			open :false
		})
	}

	render(){
		let {title,open,variant} = this.props;
		return(
			<Snackbar
      			anchorOrigin={{
      				vertical: 'bottom',
        			horizontal: 'left',
      			}}
      			open={open}
      			onClose={this.handleClose.bind(this)}
      			autoHideDuration={3000}
      			ContentProps={{
        			'aria-describedby': 'message-id'
      			}}
    		>
    			<SnackbarContent
      				className={variant}
     				aria-describedby="client-snackbar"
      				message={
        			<span id="client-snackbar">
          				{title}
       				</span>
      				}
    			/>

    		</Snackbar>
		)
	}
}



const mapStateToProps = (state,props)=>{
    return{
    	open : state.notification.open,
    	title : state.notification.title,
    	variant: state.notification.variant
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleClose (payload){
			dispatch(action_toast(payload))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Toast);