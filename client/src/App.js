import React from 'react';
import { Router, Route,Switch} from 'react-router-dom';
import history from './routes/history';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './views/Login/';
import Signup from './views/Signup';
import Admin from './views/Admin';
import Representative from './views/Representative';
import Seller from './views/Seller';
import NoMatch from './components/NoMatch';


const  App = ()=> {
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
            path="/seller"
            component={Seller}
        />
    		<Route component={NoMatch} />
   		</Switch>

   	</Router>

  );
}

export default App;
