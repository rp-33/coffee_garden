import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component : Component,isAuthenticated})=>{

	return(
		<Route 
			render = {props =>
				isAuthenticated ? (
					<Component {...props} />
				) 	: 	(
					<Redirect to= "/" />
				)
			}
		/>
	)
}

PrivateRoute.defaultProps = {
	isAuthenticated : false
}

PrivateRoute.propTypes = {
	isAuthenticated : PropTypes.bool.isRequired
}


const mapStateToProps = (state,props)=>{
    return{
        isAuthenticated : state.user.isAuthenticated
    }
}


export default connect(mapStateToProps)(PrivateRoute);