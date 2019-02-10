import React from 'react';
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// import "./Dashboard.css"


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class Dashboard extends React.Component {
    state ={
      open: false
    }
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
    render(){
        const {classes, auth} = this.props
        if(!auth.isAuthenticated()){
            alert("You must be Authenticated")
            return <Redirect to="/"/>
        }
        const events = (
            <Table className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
        const sendMessage = (

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Send A Reminder</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Remind participant about an event, please enter client's and event information. We will send
                reminder occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="event"
                label="About the event"
                type="text"
                fullWidth
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        )
        return (
          
            <div className={classes.root}>
                <br/> <br/> <br/> <br/>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <Paper className={classes.paper} elevation={1}>
                    <MenuList>
                        <MenuItem className={classes.menuItem} onClick={this.handleClickOpen}>
                          <ListItemIcon className={classes.icon}>
                              <SendIcon />
                          </ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }} inset primary="Sent Message" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Drafts" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" />
                        </MenuItem>
                    </MenuList>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    {sendMessage}
                    {events}
                  </Paper>
                </Grid>
              </Grid>
            </div>
        );
    }
  
}

export default withStyles(styles)(Dashboard)