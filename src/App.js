import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Forgot from './components/Forgot';
import Resetpassword from './components/Resetpassword';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/reset/:token" component={Resetpassword} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect to = '/signin' />
      </Switch>
    );
  }
}

export default App;
