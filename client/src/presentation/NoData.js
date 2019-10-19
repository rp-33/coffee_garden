import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import animationData from '../assets/animations/not-shopping.json';

 const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
    	preserveAspectRatio: 'xMidYMid slice'
    }
}

const NoData = ({message})=>{
	return(
		<div style={styles.ctn}>
			<Lottie options={defaultOptions}
              height={200}
              width={200}
			/>
			<div style={styles.text}>{message}</div>
		</div>
	)
}

const styles = {
	ctn:{
		display:'flex',
		flex:1,
		justifyContent:'center',
		flexDirection:'column',
		alignItems:'center',
		width:'100%',
		height:'100%'
	},
	text:{
		color:'black'
	}
}

NoData.defaultProps = {
	message : 'No hay resultados'
};

NoData.propTypes = {
	message : PropTypes.string.isRequired
}

export default NoData;