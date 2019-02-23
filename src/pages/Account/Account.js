import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import Spacing from '../../components/Spacing/Spacing';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});
class AccountDetails extends React.Component {

    state = { 
      expanded: false,
      profile: {}
    };

    componentWillMount() {
        const { getProfile } = this.props.auth;
        this.setState({profile: getProfile()})
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    
    render() {
        const { classes} = this.props;
        const { profile } = this.state; 
        console.log(profile) 
        const name = profile.name  || profile.nickname    
        return (
             <div className={classes.root}>
              <Spacing/>
            <Grid
                container
                alignItems="center"
                justify="center"
             >
                <Card className={classes.card} >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {name.toUpperCase().charAt(0)}
                            </Avatar>
                        }
                        title={name}
                        subheader={profile.nickname}
                />
                    <CardMedia
                        className={classes.media}
                        image={profile.picture}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom={true} >  
                           Some Dummy Data
                        </Typography>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton
                            className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
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
                            <Typography paragraph>Update:</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>    
            </div>   
        );
    }
}


export default withStyles(styles)(AccountDetails);