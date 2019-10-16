import React,{Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import {action_toast} from '../actions/notification';

class Toast extends Component{

	handleClose(){
		this.props.handleClose({
			title : '',
			open :false
		})
	}

	render(){
		let {title,open} = this.props;
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
      			message={<span id="message-id">{title}</span>}
    		/>
		)
	}
}



const mapStateToProps = (state,props)=>{
    return{
    	open : state.notification.open,
    	title : state.notification.title
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