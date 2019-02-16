import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default class Message extends React.Component{
    state = {    
      eventName:"",
      totalParticipants:"",
      numberOfMales: 0,  
      numberOfFemales:0,
    }
    
    handleChange = (e) => {
      e.persist()
      this.setState({[e.target.name]: e.target.value }, () => console.log({"name ": [e.target.name], "value": e.target.value}));
    }

    saveData =() => {

      if(this.state.eventName !== "" && this.state.numberOfMales !== "" &&  this.state.numberOfFemales !== ""){
        let total = Number.parseInt(this.state.numberOfFemales) + Number.parseInt(this.state.numberOfMales)
          let data = {
            eventName: this.state.eventName,
            totalParticipants: total,
            numberOfMales: this.state.numberOfMales,
            numberOfFemales: this.state.numberOfFemales
          }
          this.props.createEvent(data, this.props.handleSendMessage)
      }

    }
    
    render(){
      const {openDialog, onCloseDialog, handleCancelMesage} = this.props
        return (
          <Dialog
            open={openDialog}
            onClose={onCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Participant Reminder</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Remind participant about an event, please enter client's and event information. We will send
                reminder occasionally.
              </DialogContentText>
              <form>
                <TextField
                  value={this.state.eventName} 
                  onChange={this.handleChange}
                  autoFocus
                  margin="dense"
                  id="eventName"
                  name="eventName"
                  label="Event Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={this.state.numberOfMales} 
                  onChange={this.handleChange}
                  autoFocus
                  margin="dense"
                  id="numberOfMales"
                  name="numberOfMales"
                  label="Number of Males"
                  type="number"
                  fullWidth
                />
                <TextField
                  value={this.state.numberOfFemales} 
                  onChange={this.handleChange}
                  autoFocus
                  margin="dense"
                  id="numberOfFemales"
                  name="numberOfFemales"
                  label="Number of Females"
                  type="number"
                  fullWidth
                />              
              </form>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleCancelMesage}>
                Cancel
              </Button>
              <Button color="primary" onClick={this.saveData}>
                Send
              </Button>
            </DialogActions>
        </Dialog>
        )
    }
}


       