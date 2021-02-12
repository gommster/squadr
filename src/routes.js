import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Profile from './Components/Profile/profile';
import Register from './Components/Register/Register';

export default (
  <Switch>
    <Route component={Auth} exact path='/' />
    <Route component={Register} path='/reg' />
    <Route component={Dash} path='/dash' />
    <Route component={Profile} exact path='/profile' />
  </Switch>
);