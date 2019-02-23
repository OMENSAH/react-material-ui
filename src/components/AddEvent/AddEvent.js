import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import 'date-fns';
const date  = new Date().toDateString()
class AddEvent extends React.Component{
    state = {    
      eventName:"",
      totalParticipants:"",
      selectedDate: date.toString()
    }
    
    handleChange = (e) => {
      e.persist()
      this.setState({[e.target.name]: e.target.value });
    }

    handleDateChange = date => {
      this.setState({ selectedDate: date });
    };

    saveData =() => {    
      if(this.state.eventName !== "" && this.state.totalParticipants !== ""){
          let data = {
            eventName: this.state.eventName,
            totalParticipants: this.state.totalParticipants,
            selectedDate: this.state.selectedDate
          }
          this.props.createEvent(data, this.props.handleSendMessage)
          this.setState(
            {    
              eventName:"",
              totalParticipants:"",
              selectedDate: date.toString()
            }, () => {
              return <Redirect to="/dashboard"/>
            }
          )
      }

    }
    
    render(){
      const {openDialog, onCloseDialog, handleCancelMesage} = this.props
      const { selectedDate } = this.state;
        return (
          <Dialog
            open={openDialog}
            onClose={onCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Adding Event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Record your events and management them anywhere, everytime.
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
                  value={this.state.totalParticipants} 
                  onChange={this.handleChange}
                  autoFocus
                  margin="dense"
                  id="totalParticipants"
                  name="totalParticipants"
                  label="Total Number of Participants"
                  type="number"
                  fullWidth
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                    <DatePicker
                      margin="dense"
                      label="Event Date"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                    /> 
                </MuiPickersUtilsProvider>       
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

export default AddEvent;
       