import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	title: {
		padding: theme.spacing(2)
	},
})

function Header({ classes }) {
  return (
    <AppBar>
      <Typography className={classes.title}>
      	Dungeons &amp; Dragons
      </Typography>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
