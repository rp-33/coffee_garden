import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {deleteProduct} from '../../services/api';

class ModalDeleteProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading : false
        }
    }
 
 	async handleDelete(){
        try
        {
            this.setState({
                isLoading : true
            });

            let {_id,position,category} = this.props.product;
            let {status} = await deleteProduct(category,_id);
            if(status==204)
            {
    			this.props.handleSuccess(_id,position);
            }

        }
        catch(err)
        {
          alert(err)
        }
        finally
        {
            this.setState({isLoading:false})
        }

    }
    

    render(){
        let {open,handleClose,product} = this.props;
         return(
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div className="modal-delete">
                    <div className="ctn">
                        {this.state.isLoading
                        ?
                        <div className="ctn-loading">
                            <CircularProgress color="secondary"/>
                        </div>
                        :
                        <div>
                            <h2>Eliminar producto</h2>
                            <p>¿Deseas eliminar {product.name}?</p>
                            <div style={{textAlign:'right'}}>
                                <Button color="secondary" onClick = {()=>handleClose(false)}>cancelar</Button>
                                <Button color="primary" onClick={this.handleDelete.bind(this)}>Aceptar</Button>
                            </div>
                        </div>
                        }
                    </div>                  
                </div>
            </Slide>
        )
    }
}


ModalDeleteProduct.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose : PropTypes.func.isRequired,
    product : PropTypes.shape({
    	_id : PropTypes.string,
        name : PropTypes.string
    })
}

export default ModalDeleteProduct;