import {NavLink} from 'react-router-dom'
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbarContentWrapper from '../Snackbar/Snackbar'

import AddEvent from './../AddEvent/AddEvent';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  });

class MenuAppBar extends React.Component {
    state = {
        openDrawer: false,
        anchorEl: null,
        openDialog: false,
        showSnackbar: false,
        cancelled: false
    }
      
    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };
    
    handleSendMessage = () => {
        this.setState({ openDialog: false, showSnackbar: true,cancelled:false})
    };
  
    handleCancelMesage = () => {
        this.setState({ openDialog: false, showSnackbar: true, cancelled:true});
    }
    
    handleCloseSnackbar = () => {
        this.setState({ showSnackbar: false})
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
        
    handleDrawerOpen = () => {
        this.setState({ openDrawer: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ openDrawer: false });
    };
    
    render() {
        const { classes, theme, auth, createEvent} = this.props;
        const { openDrawer , anchorEl} = this.state;
        const openScreen = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
                >
                <Toolbar disableGutters={!openDrawer}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, openDrawer && classes.hide)}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Home
                        </NavLink>
                 </Typography>
                    {auth.isAuthenticated() && (
                        <div>
                            <IconButton
                                aria-owns={openDrawer ? 'menu-appbar' : undefined}
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                             <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openScreen}
                                onClose={this.handleClose}
                            >
                            <MenuItem>
                                <NavLink to="/account" style={{ textDecoration: 'none', color: 'black' }}>
                                My Account
                                </NavLink>
                            </MenuItem>
                            <MenuItem >
                                <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                                Dashboard
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={auth.logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        )}
                </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={openDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {
                        auth.isAuthenticated() &&(
                            <List>
                                <ListItem button onClick={this.handleClickOpenDialog}>
                                    <ListItemIcon className={classes.icon}>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Add Event" />
                                </ListItem>                            
                            </List>
                        )  
                }
                </Drawer> 
                <AddEvent 
                    createEvent = {createEvent}
                    openDialog={this.state.openDialog} 
                    onCloseDialog={this.handleCloseDialog}
                    handleCancelMesage = {this.handleSendMessage}
                    handleSendMessage = {this.handleCancelMesage}
                />
                {this.state.cancelled
                    ?(
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}      
                        open={this.state.showSnackbar}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnackbar}
                        >
                        <MySnackbarContentWrapper
                            onClose={this.handleCloseSnackbar}
                            variant="success"
                            message="Event has been successfully recorded"
                        />
                    </Snackbar> 
                    )
                    :(
                        <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}      
                        open={this.state.showSnackbar}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnackbar}
                        >
                        <MySnackbarContentWrapper
                            onClose={this.handleCloseSnackbar}
                            variant="error"
                            message="Adding event got cancelled "
                        />
                        </Snackbar>     
                    )
                }
         </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MenuAppBar);