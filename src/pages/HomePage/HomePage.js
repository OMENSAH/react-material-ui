import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import "./HomePage.css";

class HomePage extends Component {
  render() {
    const { classes, auth } = this.props;
    const content = !auth.isAuthenticated() ? (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={auth.signIn}
      >
        Login
      </Button>
    ) : null;
    return (
      <div className="container">
        <div className="overlay" />
        <div className="content">
          <h1>Event Scheme</h1>
          <Typography>
            Let's help you create and manage your events.
          </Typography>
          {content}
        </div>
      </div>
    );
  }
}
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(HomePage);
