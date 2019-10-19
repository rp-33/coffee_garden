import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import BarMessage from '../../presentation/BarMessage';
import {saveOrder} from '../../services/api';
import {totalPrice} from '../../utils/products';
import {structureDate} from '../../utils/date';


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
			let {balance,products,user,date,handleSuccess,school} = this.props;
			let total = totalPrice(products);
			let {status,data} = await saveOrder(school,user,products,total,structureDate(date));
			if(status === 201)
			{
				handleSuccess(data,date);
			}
			else if(status === 204)
			{
				this.setState({
					error : 'No dispones de saldo suficiente'
				})	
			}
			else
			{
				this.setState({
					error : data.error
				})
			}
	
		}
		catch(err)
		{
			this.setState({
				error : 'Error'
			})
		}
		finally{
			this.setState({
				isLoading : false
			})
		}

	}

	render(){

		let {open,handleClose} = this.props;

		return(
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<div className="modal-pay">
			 	<Paper className="form-control">
                   		<div className="icon-close" onClick = {()=>handleClose(false)}>
                        	<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                    	</div>
         			<h2 style={{color:'#e2474b',textAlign:'center'}}>Pagar</h2>
						<BarMessage 
							title = {this.state.error}
						/>					
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
         			{this.props.products.map((item,i)=>
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
                   		<span>{totalPrice(this.props.products)} BSS</span>
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
	open : PropTypes.bool.isRequired,
	school : PropTypes.string.isRequired,
	user :  PropTypes.string.isRequired,
	balance :  PropTypes.number.isRequired,
	products : PropTypes.array.isRequired,
	date :  PropTypes.string.isRequired,
	handleSuccess : PropTypes.func.isRequired,
	handleClose : PropTypes.func.isRequired
}


export default ModalPay;