import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

class ModalBank extends Component{
	render(){
		let {open,handleClose} = this.props;
		return(
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
         		<div className="modal-bank">
         			<Paper className="form-control">
						<div className="icon-close" onClick = {()=>handleClose(false)}>
                       		<CancelIcon fontSize="large" style={{color:'#e44a4c'}}/>
                   		</div>
						<h2 style={{color:'#e2474b',textAlign:'center'}}>Cuentas a transferir</h2>        	
						<ExpansionPanel className="collapsible">
       						<ExpansionPanelSummary
          					expandIcon={<ExpandMoreIcon />}
          					aria-controls="panel1a-content"
          					id="banco-banesco"
        					>
          						<p style={{fontWeight:'bold'}}>Banco Banesco</p>
       						</ExpansionPanelSummary>
        					<ExpansionPanelDetails>
								<div>
									<ol>
										<li>Nro : 0134-1203-11-0001000994</li>
										<li>V-22329827</li>
										<li>Jorge Galindez</li>
									</ol>								
								</div>
        					</ExpansionPanelDetails>
      					</ExpansionPanel>
						<ExpansionPanel className="collapsible">
       						<ExpansionPanelSummary
          					expandIcon={<ExpandMoreIcon />}
          					aria-controls="panel1a-content"
          					id="banco-provincial"
        					>
          						<p style={{fontWeight:'bold'}}>Banco Provincial</p>
       						</ExpansionPanelSummary>
        					<ExpansionPanelDetails>
         						<div>
									<ol>
										<li>Nro : 0108-2416-87-0100236905</li>
										<li>V-22330618</li>
										<li>Zulimar Vera</li>
									</ol>								
								</div>
        					</ExpansionPanelDetails>
      					</ExpansionPanel>
						  <ExpansionPanel className="collapsible">
       						<ExpansionPanelSummary
          					expandIcon={<ExpandMoreIcon />}
          					aria-controls="panel1a-content"
          					id="zelle"
        					>
          						<p style={{fontWeight:'bold'}}>zelle</p>
       						</ExpansionPanelSummary>
        					<ExpansionPanelDetails>
								<div>
									<ol>
										<li>Jorge Galindez</li>
										<li>jorgeciti00@gmail.com</li>
									</ol>								
								</div>
        					</ExpansionPanelDetails>
      					</ExpansionPanel>
					 </Paper>
         		</div>
         	</Slide>
		)
	}
}

ModalBank.propTypes = {
	open : PropTypes.func.isRequired,
	handleClose : PropTypes.func.isRequired
}

export default ModalBank;