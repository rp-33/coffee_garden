import React,{Component} from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {deleteSeller} from '../../services/api';

class ModalDeleteUser extends Component{
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

                  let {status} = await deleteSeller(this.props.user._id);
                  if(status==204){
                        this.props.handleSuccess(this.props.user._id);
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
                let {open,handleClose,user} = this.props;
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
                                                <h2>Eliminar usuario</h2>
                                                <p>¿Deseas eliminar a {user.names} {user.lastNames} ?</p>
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


ModalDeleteUser.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose : PropTypes.func.isRequired,
        user : PropTypes.shape({
            names : PropTypes.string,
            lastNames : PropTypes.string
        })
}

export default ModalDeleteUser;