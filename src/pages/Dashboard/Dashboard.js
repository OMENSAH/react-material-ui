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
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
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
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbarContentWrapper from '../../components/Snackbar/Snackbar'



import BarChart from '../../components/Chart/Chart'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

let id = 0;
function createData(eventName, totalParticipants, numberOfMales, numberOfFemales) {
  id += 1;
  return { id, eventName, totalParticipants, numberOfMales, numberOfFemales};
}

const rows = [
  createData('Developer Jobs 101', 159, 82, 68),
  createData('Public Speaking for Developers', 220, 94, 126),
  createData('React Workshop', 84, 59, 25),
  createData('Campus Roadshow', 42, 30, 12),

];
const totalParticipants = [159, 220, 84, 42]


class Dashboard extends React.Component {
    state ={
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
              <TableCell>Upcoming Events</TableCell>
              <TableCell align="right">Registered participants</TableCell>
              <TableCell align="right">Number of Males</TableCell>
              <TableCell align="right">Number of Females</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.eventName}
                </TableCell>
                <TableCell align="right">{row.totalParticipants}</TableCell>
                <TableCell align="right">{row.numberOfMales}</TableCell>
                <TableCell align="right">{row.numberOfFemales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
        const sendMessage = (
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Participant Reminder</DialogTitle>
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
              <Button onClick={this.handleCancelMesage} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleSendMessage} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        )
        const snackbarContent = !this.state.cancelled
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
                message="Participant witll be messaged soon"
              />
          </Snackbar> 
        ):
        (
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
            message="Sending message got cancelled "
          />
        </Snackbar> 
        )
        return (
            <div className={classes.root}>
                <br/> <br/> <br/> <br/>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <Paper className={classes.paper} elevation={1}>
                    <MenuList>
                        <MenuItem className={classes.menuItem} onClick={this.handleClickOpenDialog}>
                          <ListItemIcon className={classes.icon}>
                              <SendIcon />
                          </ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }} inset primary="Sent A Reminder" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            < AddCircleOutline/>
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
                    <Typography variant="h5" gutterBottom={true} >
                       Graphical Representation of Event's Participants
                    </Typography>
                    {snackbarContent }   
                    <BarChart totalParticipants={totalParticipants}/>             
                  </Paper>
                </Grid>
              </Grid>
            </div>
        );
    }
  
}

export default withStyles(styles)(Dashboard)