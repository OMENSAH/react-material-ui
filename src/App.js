import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";

import { Route, Redirect, withRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";

import Auth from "./service/Auth";
import Callback from "./components/Callback";

const divStyle = {
  marginTop: "65px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.auth = new Auth(this.props.history);
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") return;
    try {
      await this.auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
  }

  createEvent = (event, cb) => {
    let newDataSet = [...this.state.data, event];
    this.setState({ data: newDataSet }, () => cb());
  };
  render() {
    return (
      <div style={divStyle}>
        <NavBar createEvent={this.createEvent} auth={this.auth} />
        <Route path="/" exact component={() => <HomePage auth={this.auth} />} />
        <Route
          path="/callback"
          component={() => <Callback auth={this.auth} />}
        />
        <Route path="/about" component={About} />
        <Route
          path="/dashboard"
          component={() =>
            this.auth.isAuthenticated() ? (
              <Dashboard auth={this.auth} data={this.state.data} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/account"
          component={() =>
            this.auth.isAuthenticated() ? (
              <Account auth={this.auth} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
