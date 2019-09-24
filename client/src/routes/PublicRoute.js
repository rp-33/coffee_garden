import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({component : Component,isAuthenticated,route})=>(

	<Route 
		render = {props =>
			!isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect to= {`/${route}`} />
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
        isAuthenticated : state.user.isAuthenticated,
        route : state.user.rol
    }
}


export default connect(mapStateToProps)(PublicRoute);