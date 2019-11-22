import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Payments from '../containers/Payments';

const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={isLogged ? Home : Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/payments' component={isLogged ? Payments : Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
