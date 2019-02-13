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

let id = 0;
function createData(eventName, totalParticipants, numberOfMales, numberOfFemales) {
  id += 1;
  return { id, eventName, totalParticipants, numberOfMales, numberOfFemales};
}

const rows = [
  createData('Developer Jobs 101', 159, 82, 68),
  createData('Public Speaking for Developers', 220, 94, 126),
  createData('React Workshop', 84, 59, 25),
  createData('Campus Roadshow', 42, 30, 12),

];

class App extends Component {
  state = {
    data:rows
  }

  addData = (newData) => {
    this.setState({data:[...this.state.data, newData]})
  }

  componentWillUnmount(){
    if(localStorage.getItem("isLoggedIn") === true) auth.renewSession()
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuAppBar auth={auth} addData={this.addData}/>
          <Route path="/" exact  component={() => <HomePage auth={auth}/>} />
          <Route path="/callback" exact component={() =>< Callback auth={auth} />} />
          <Route path="/dashboard" exact component={() => <Dashboard auth={auth} data={this.state.data}/>} />
          <Route path="/account" exact component={() => <AccountDetails auth={auth}/>} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

