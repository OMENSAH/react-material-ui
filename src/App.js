import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import MenuAppBar from './components/Header/Header';
import Auth from "./service/Auth";


import HomePage from './pages/HomePage/HomePage'
import Callback from './components/Callback'
import Dashboard from  './pages/Dashboard/Dashboard'
import AccountDetails  from './pages/Account/Account'

const auth = new Auth();

class App extends Component {
  componentWillUnmount(){
    if(localStorage.getItem("isLoggedIn") === true) auth.renewSession()
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuAppBar auth={auth}/>
          <Route path="/" exact  component={() => <HomePage auth={auth}/>} />
          <Route path="/callback" exact component={() =>< Callback auth={auth} />} />
          <Route path="/dashboard" exact component={() => <Dashboard auth={auth}/>} />
          <Route path="/account" exact component={() => <AccountDetails auth={auth}/>} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

