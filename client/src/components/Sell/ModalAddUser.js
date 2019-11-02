import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import BarMessage from '../../presentation/BarMessage';
import {filterQueryUser} from '../../services/api';
import PropTypes from 'prop-types';

class ModalAddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            data : [],
            value : '',
            error : ''
        }
    }

    async handleChange(event){
        try
        {
            let {value,name} = event.target;
            this.setState({
                [name] : value
            })
            if(value.length<3) return;
            let {status,data} = await filterQueryUser(value);
            if(status === 200)
            {
                this.setState({
                    error : '',
                    data : data
                })
            }
            else if(status === 500)
            {
                this.setState({
                    error :'Error en el servidor'
                })
            }
            else
            {
                this.setState({
                    data : [],
                    error: data.error
                })
            }
        }
        catch(err)
        {
            console.log(err)
            this.setState({
                error : 'Error'
            })
        }
    }


    render(){
        let {open,handleClose,handleSave} = this.props;
        return(
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div className="modal-add-user">
                    <Paper className="form-control">
                        <div className="icon-close" onClick = {()=>handleClose(false)}>
                            <CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                        </div>
         			    <h2 style={{color:'#e2474b',textAlign:'center'}}>Buscar usuarios</h2>
                        <BarMessage 
						    title = {this.state.error}
					    />
                        <div className="ctn-input">
							<input 
							type="text" 
							placeholder="introduzca Cedula o nombre" 
							value = {this.state.value}
							name="value"
							onChange = {this.handleChange.bind(this)}
							/>
						</div>
                        <div className="ctn-find-user">
                            {this.state.data.map((item,i)=>
                                <section>
                                {item._id &&
                                <div key = {i}>
                                    <span>{item.names} {item.lastNames}</span>
                                    <Button 
                                        color="secondary"
                                        onClick = {()=>handleSave(item)}
                                    >
                                      Guardar
                                    </Button>
                                </div>
                                }
                                </section>
                            )}
                        </div>
                    </Paper>
                </div>
            </Slide>
        )
    }
}

ModalAddUser.propTypes = {
    handleSave : PropTypes.func.isRequired,
    handleClose : PropTypes.func.isRequired,
    open : PropTypes.bool.isRequired
}

export default ModalAddUser