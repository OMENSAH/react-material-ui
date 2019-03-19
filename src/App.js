import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import MenuAppBar from "./components/Header/Header";
import AuthClient from "./service/Auth";

import HomePage from "./pages/HomePage/HomePage";
import Callback from "./components/Callback";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountDetails from "./pages/Account/Account";
import About from "./pages/About/About";

const divStyle = {
  margin: "60px"
};

class App extends Component {
  state = {
    data: []
  };
  createEvent = (event, cb) => {
    let newDataSet = [...this.state.data, event];
    this.setState({ data: newDataSet }, () => cb());
  };
  render() {
    return (
      <BrowserRouter>
        <div style={divStyle}>
          <MenuAppBar auth={AuthClient} createEvent={this.createEvent}/>
          <Route path="/" exact component={() => <HomePage auth={AuthClient} />} />
          <Route
            path="/callback"
            exact
            component={() => <Callback auth={AuthClient} />}
          />
          <Route
            path="/dashboard"
            exact
            component={() => <Dashboard auth={AuthClient} data={this.state.data} />}
          />
          <Route path="/about" exact component={About} />
          <Route
            path="/account"
            exact
            component={() => <AccountDetails auth={AuthClient} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
