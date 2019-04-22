import React from "react";
import {withStyles} from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});
class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      profile: {},
      imagePlaceHolder:"./placeholder.png"
    };
  }

  componentDidMount() {
    let profile = this.props.auth.getProfile()
    this.setState({ profile, imagePlaceHolder: profile.picture })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { profile } = this.state;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Card className={classes.card}>
            <CardHeader title={profile.nickname} />
            <CardMedia
              className={classes.media}
              image={this.state.imagePlaceHolder}
              title={profile.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom={true}>
                Other Profile Data
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography component={"span"} variant={"body2"}>
                  <pre>{JSON.stringify(profile, null, 2)}</pre>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AccountDetails);
