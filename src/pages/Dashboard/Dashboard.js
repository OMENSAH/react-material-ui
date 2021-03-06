import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  render() {
    const { classes } = this.props;
    const dashboardContent =
      this.state.data.length > 0 ? (
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Upcoming Events</CustomTableCell>
                <CustomTableCell align="right">
                  Number of Participants
                </CustomTableCell>
                <CustomTableCell align="right">Event Date</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, id) => (
                <TableRow key={id} className={classes.row}>
                  <CustomTableCell component="th" scope="row">
                    {row.eventName}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.totalParticipants}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.selectedDate}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <h1>You are currently not managing any Event.</h1>
      );
    return (
      <div className={classes.root}>
        <Grid container align="center" justify="center">
          <Paper className={classes.paper}>{dashboardContent}</Paper>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
