import React,{Component} from 'react';
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

class App extends Component{
  constructor(props){
    super(props);
    history.push(`/${props.rol}`);
  }

  render(){
    return (
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

    )
  }
}


const mapStateToProps = (state,props)=>{
    return{
      rol : state.user.rol
    }
}


export default connect(mapStateToProps)(App);