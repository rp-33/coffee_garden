import React,{Component,Fragment} from 'react';
import { Router, Route,Switch} from 'react-router-dom';
import history from './routes/history';
import {connect} from 'react-redux';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './views/Login/';
import Signup from './views/Signup';
import Admin from './views/Admin';
import Representative from './views/Representative';
import Represented from './views/Represented';
import Seller from './views/Seller';
import NoMatch from './components/NoMatch';
import Toast from './presentation/Toast';

class App extends Component{
  componentDidMount(){
    this._route(this.props.rol,window.location.pathname);
  }

  _route(rol,pathname){
    let rolURl= `/${rol}`;
    if(pathname.indexOf(rolURl)===-1) history.push(rolURl);   
  }

  render(){
    return (
    <Fragment>
      <Toast />
   	  <Router history={history}> 	
   		<Switch>
   			<PublicRoute
   				exact
      			path="/"
      			component={Login}
    		/>
    		<PublicRoute
   				exact
      			path="/signup"
      			component={Signup}
    		/>
   			<PrivateRoute
      			path="/admin"
      			component={Admin}
    		/>
        <PrivateRoute
            path="/representative"
            component={Representative}
        />
        <PrivateRoute
            path="/represented"
            component={Represented}
        />
        <PrivateRoute
            path="/seller"
            component={Seller}
        />
    		<Route component={NoMatch} />
   		  </Switch>
    	</Router>
    </Fragment>
    )
  }
}


const mapStateToProps = (state,props)=>{
    return{
      rol : state.user.rol
    }
}


export default connect(mapStateToProps)(App);