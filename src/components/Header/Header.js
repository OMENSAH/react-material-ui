import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Add from "@material-ui/icons/Add";
import Info from "@material-ui/icons/Info";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AddEvent from "../AddEvent/AddEvent";

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 20
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  root: {
    display: "flex",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    marginLeft: 15
  }
});

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      anchorEl: null,
      openDialog: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { classes } = this.props;
    const showPopOver = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.openDrawer
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.openDrawer)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home
              </NavLink>
            </Typography>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                Dashboard
              </NavLink>
            </Typography>
            {this.props.auth.isAuthenticated() ? (
              <div>
                <IconButton onClick={this.handleMenuOpen} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  anchorEl={this.state.anchorEl}
                  open={showPopOver}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem>
                    <NavLink
                      to="/account"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      My Account
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={this.props.auth.signOut}>Logout</MenuItem>
                </Menu>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.openDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          className={classes.drawer}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink
              to="/about"
              style={{ textDecoration: "none" }}
              onClick={this.handleDrawerClose}
            >
              <ListItem button>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </NavLink>

            {this.props.auth.isAuthenticated() ? (
              <ListItem button onClick={this.handleClickOpenDialog}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add Event" />
              </ListItem>
            ) : null}
          </List>
        </Drawer>
        <AddEvent
          createEvent={this.props.createEvent}
          openDialog={this.state.openDialog}
          onCloseDialog={this.handleCloseDialog}
        />
      </div>
    );
  }
}
export default withStyles(styles)(MenuAppBar);
