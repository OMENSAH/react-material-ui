import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default class AddEvent extends React.Component{
    render(){
      const {openDialog, onCloseDialog, handleCancelMesage, handleSendMessage} = this.props
        return (
          <Dialog
            open={openDialog}
            onClose={onCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name of Event"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="femaleParticipants"
                label="Number of Female Participants"
                type="text"
                fullWidth
              />
               <TextField
                autoFocus
                margin="dense"
                id="maleParticipants"
                label="Number of Male Participants"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleCancelMesage}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </DialogActions>
        </Dialog>
        )
    }
}


       