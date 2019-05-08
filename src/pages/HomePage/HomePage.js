import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./HomePage.css";

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="overlay" />
        <div className="content">
          <h1>Event Scheme</h1>
          <Typography>Let's help you create and manage your events.</Typography>
          {this.props.auth.isAuthenticated() ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.auth.signIn}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default HomePage;
