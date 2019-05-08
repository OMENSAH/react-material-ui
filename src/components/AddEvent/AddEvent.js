import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import "date-fns";

import MySnackbarContentWrapper from "../Snackbar/Snackbar";
import { Snackbar } from "@material-ui/core";

const date = new Date().toDateString();

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      totalParticipants: "",
      selectedDate: date,
      showSnackbar: false,
      isCancelled: false
    };
  }

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date.toDateString() });
  };

  handleDialogCancel = () => {
    this.props.onCloseDialog();
    this.setState({ isCancelled: true, showSnackbar: true });
  };

  handleCloseSnackbar = () => {
    this.setState({ showSnackbar: false });
  };

  saveData = () => {
    if (this.state.eventName !== "" && this.state.totalParticipants !== "") {
      let data = {
        eventName: this.state.eventName,
        totalParticipants: this.state.totalParticipants,
        selectedDate: this.state.selectedDate
      };
      this.props.createEvent(data, () => {
        this.setState({
          eventName: "",
          totalParticipants: "",
          selectedDate: date.toString(),
          showSnackbar: true
        });
        this.props.onCloseDialog();
      });
    }
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.onCloseDialog}
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
            <Button color="secondary" onClick={this.handleDialogCancel}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveData}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.isCancelled ? (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.showSnackbar}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
          >
            <MySnackbarContentWrapper
              variant="error"
              message="Form Got Cancelled"
            />
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.showSnackbar}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
          >
            <MySnackbarContentWrapper
              variant="success"
              message="Data Successfully Saved"
            />
          </Snackbar>
        )}
      </div>
    );
  }
}

export default AddEvent;
