import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import BarMessage from '../../presentation/BarMessage';
import {totalPrice} from '../../utils/products';
import {saveShopping} from '../../services/api';

class ModalPay extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			error : ''
		}
	}

	async handlePay(){
		try
		{
			this.setState({
				isLoading:true,
				error:''
			});
			let {date,products,handleSuccess,school} = this.props;
			let {status,data} = await saveShopping(school,date,products);
			if(status==201)
			{
				handleSuccess(date);
			}
	
		}
		catch(err)
		{
			alert(err);
		}
		finally{
			this.setState({
				isLoading : false
			})
		}

	}

	render(){

		let {open,handleClose,products} = this.props;

		return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<div className="modal-pay">
			 	<Paper className="form-control">
                   		<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         			<h2 style={{color:'#e2474b',textAlign:'center'}}>Pagar</h2>
         				{this.state.error &&
							<BarMessage 
								title = {this.state.error}
							/>
						}
         			<div className="ctn-grid">
         				<div className="left" style={{color:"#f69471"}}>
         					cant
         				</div>
         				<div className="center" style={{color:"#f69471"}}>	
         					producto
         				</div>
         				<div className="right" style={{color:"#f69471"}}>
         					precio
         				</div>
         			</div>
         			{products.map((item,i)=>
                    	<div className="ctn-grid">
         				<div className="left">
         					{item.quantity}
         				</div>
         				<div className="center">	
         					{item.name}
         				</div>
         				<div className="right">
         					{item.price}
         				</div>
         			</div>
                   	)}
                   	<div className="price-total">
                   		<span>{totalPrice(products)} BSS</span>
                   	</div>
                   	<div className="ctn-btn">
                   		{this.state.isLoading
                   		?
                   			<CircularProgress color="secondary"/>
                   		:
                   			<Fab onClick={this.handlePay.bind(this)} variant="extended" size="large" color="secondary" className="secondary">
                               realizar pago
                           	</Fab>
                   		}
                   	</div>
         		</Paper>
            </div>

		</Slide>
		)
	}
}

ModalPay.propTypes = {
	open : PropTypes.func.isRequired,
	products : PropTypes.arrayOf(
		PropTypes.shape({
      		quantity : PropTypes.number,
      		name : PropTypes.string,
      		price : PropTypes.number,
      		image : PropTypes.string
    	})
	),
	date : PropTypes.string.isRequired,
	handleSuccess : PropTypes.func.isRequired,
	handleClose : PropTypes.func.isRequired
}


export default ModalPay;