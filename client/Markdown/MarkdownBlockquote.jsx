import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const Blockquote = withStyles((theme) => ({
  root: {
    borderLeft: '4px solid rgba(0, 0, 0, 0.23)',
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
}))(({ children, classes }) => <Typography className={classes.root} component="blockquote">{children}</Typography>);

export default Blockquote;