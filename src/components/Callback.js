import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../service/Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    const { history } = this.props;
    history.replace("/");
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
