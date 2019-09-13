import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({component : Component,isAuthenticated})=>(

	<Route 
		render = {props =>
			!isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect to= "/admin" />
			)
		}
	/>

)

PublicRoute.defaultProps = {
	isAuthenticated : false
}

PublicRoute.propTypes = {
	isAuthenticated : PropTypes.bool.isRequired
}

const mapStateToProps = (state,props)=>{
    return{
        isAuthenticated : state.user.isAuthenticated
    }
}


export default connect(mapStateToProps)(PublicRoute);