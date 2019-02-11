import React from 'react'
import MySnackbarContentWrapper from '../Snackbar/Snackbar'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default class Message extends React.Component{
    state ={
        open: this.props.opened
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (message,type) => {

        this.setState({ open: false }, ()=> 
            <MySnackbarContentWrapper
              variant={type?type:null}
              className={this.props.classes.margin}
              message={message?message:""}
            />
        );
    };
    render(){
        return (

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
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
              <Button onClick={()=>this.handleClose("Closed", "error")} color="primary">
                Cancel
              </Button>
              <Button onClick={()=>this.handleClose("Saved", "success")} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}


       