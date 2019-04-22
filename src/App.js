import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, withRouter } from "react-router-dom";

import MenuAppBar from "./components/Header/Header";
import Auth from "./service/Auth";

import HomePage from "./pages/HomePage/HomePage";
import Callback from "./components/Callback";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountDetails from "./pages/Account/Account";
import About from "./pages/About/About";

const divStyle = {
  margin: "65px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkingSession: true
    };
    this.auth = new Auth(this.props.history);
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await this.auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  createEvent = (event, cb) => {
    let newDataSet = [...this.state.data, event];
    this.setState({ data: newDataSet }, () => cb());
  };

  render() {
    return (
      <div style={divStyle}>
        <MenuAppBar auth={this.auth} createEvent={this.createEvent} />
        <Route path="/" exact component={() => <HomePage auth={this.auth} />} />
        <Route
          path="/callback"
          component={props => <Callback auth={this.auth} {...props} />}
        />
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
        <Route path="/about" component={About} />
        <Route
          path="/account"
          component={() =>
            this.auth.isAuthenticated() ? (
              <AccountDetails auth={this.auth} />
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
