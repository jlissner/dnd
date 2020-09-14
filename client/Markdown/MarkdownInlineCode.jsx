import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const MarkdownInlineCode = withStyles((theme) => ({
  root: {
    background: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(0.5),
    padding: 2,
    color: theme.palette.primary.main,
  },
}))(({ children, classes }) => <code className={classes.root}>{children}</code>);

export default MarkdownInlineCode