import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Callback extends Component {
  componentDidMount() {
    this.props.auth.handleAuthentication();
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
