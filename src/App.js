import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import MenuAppBar from './components/Header/Header';
import Auth from "./service/Auth";


import HomePage from './pages/HomePage/HomePage'
import Callback from './components/Callback'
import Dashboard from  './pages/Dashboard/Dashboard'
import AccountDetails  from './pages/Account/Account'
import About from './pages/About/About';


const auth = new Auth();

class App extends Component {
  state = {
    data:[]
  }

  createEvent = (event, cb) => {
      let newDataSet = [...this.state.data, event]
      this.setState({data: newDataSet}, () => cb())
  }

  componentWillUnmount(){
    if(localStorage.getItem("isLoggedIn") === true) auth.renewSession()
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuAppBar auth={auth} createEvent={this.createEvent}/>
          <Route path="/" exact  component={() => <HomePage auth={auth}/>} />
          <Route path="/callback" exact component={() =>< Callback auth={auth} />} />
          <Route path="/dashboard" exact component={() => <Dashboard auth={auth} data={this.state.data}/>} />
          <Route path="/about" exact component={About} />
          <Route path="/account" exact component={() => <AccountDetails auth={auth}/>} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

