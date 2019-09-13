import React from 'react';

const BarMessage = ({title})=>(

	<div style={styles.ctn}>
		<p style={styles.title}>{title}</p>
	</div>

)

const styles = {
	ctn:{
		backgroundColor:'black',
		opacity:0.8,
		width:'calc(100% - 20px)',
		borderRadius : '10px',
		margin:'10px 0',
		display:'flex',
		justifiContent:'center',
		alignItems:'center',
		color:'white',
		height:'50px',
		textAlign:'center',
		padding:'0 10px'
	},
	title:{
		textAlign:'center'
	}
}

export default BarMessage