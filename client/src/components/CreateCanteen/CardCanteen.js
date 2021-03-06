import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

class CardCanteen extends Component{
	constructor(props){
		super(props);
		this.state = {
			menu : false
		}
	}

	handleMenu(){
		this.setState(previosState =>{
			return{
				menu : !previosState.menu
			}
		})
	}

	handleModalEditName(item){
		this.setState({
			menu:false
		},()=>{
			this.props.handleModalEditName(true,item);
		});
	}

	handleModalEditAvatar(item){
		this.setState({
			menu:false
		},()=>{
			this.props.handleModalEditAvatar(true,item);
		});
	}

	render(){
		let {item,handleModalDelete} = this.props;
		return(
			<Paper className="item-grid">
				<div className="inf-user">
					<Link to= {`/admin/product/${item._id}`}>
						<div className="ctn-img">
							<img src={item.avatar} alt="avatar"/>
						</div>
					</Link>
					<div className="name">{item.name}</div>
				</div>
				<div className="ctn-icon-option">
					<div>
						<Link to = {`/admin/seller/${item._id}`}>
							<IconButton aria-label="seller" >
        						<PersonIcon/>
      						</IconButton>
      					</Link>
      				</div>
      				<div style={{position:'relative'}}>
						<IconButton 
							onClick={this.handleMenu.bind(this)} 
							color="primary"
						>
							<EditIcon fontSize="medium" />
						</IconButton>
						<Fade in = {this.state.menu}>
							<div className="ctn-menu">
								<div className="eyelash"></div>
								<div className="menu">
									<p onClick={this.handleModalEditName.bind(this,item)}>Nombre</p>
									<p onClick={this.handleModalEditAvatar.bind(this,item)}>avatar</p>
								</div>
							</div>
						</Fade>
					</div>
					<div>
						<IconButton 
						onClick = {()=>handleModalDelete(item._id,item.name)} 
						aria-label="delete" 
						color="secondary">
						<DeleteIcon fontSize="medium" />
						</IconButton>
					</div>
				</div>
			</Paper>
		)
	}

}

CardCanteen.propTypes = {
	item : PropTypes.shape({
		name : PropTypes.string,
		avatar : PropTypes.string,
		_id : PropTypes.string
	}).isRequired,
	handleModalDelete : PropTypes.func.isRequired
}

export default CardCanteen;