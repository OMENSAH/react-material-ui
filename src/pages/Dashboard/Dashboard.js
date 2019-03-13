import React from 'react';
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import Spacing from '../../components/Spacing/Spacing';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, 
  marginTop: {
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
});


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);




class Dashboard extends React.Component {
    state ={
      showSnackbar: false,
      cancelled: false,
    }
    
  
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
        const {classes, auth, data} = this.props
        if(!auth.isAuthenticated()){
            alert("You must be Authenticated")
            return <Redirect to="/"/>
        }
        const dashboardContent = data.length > 0
        ?(
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Upcoming Events</CustomTableCell>
                  <CustomTableCell align="right">Number of Participants</CustomTableCell>
                  <CustomTableCell align="right">Event Date</CustomTableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {data.map((row, id) => (
                <TableRow key={id} className={classes.row}>
                  <CustomTableCell component="th" scope="row">{row.eventName}</CustomTableCell>
                  <CustomTableCell align="right">{row.totalParticipants}</CustomTableCell>
                  <CustomTableCell align="right">{row.selectedDate}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
      :<h1>You are currently not managing any Event.</h1>
     return (
            <div className={classes.root}>
              <Spacing/>
              <Grid
                container
                align="center"
                justify="center"
              >
                <Paper className={classes.paper}>
                  {dashboardContent}         
                </Paper>
              </Grid>
            </div>
        );
    }
  
}

export default withStyles(styles)(Dashboard)