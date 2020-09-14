import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useCodeStyles = makeStyles((theme) => ({
  root: {
    background: ({ language }) => language === 'plain' ? 'none' : theme.palette.secondary.light,
    border: ({ language }) => language === 'plain' ? 'none' : `1px solid ${theme.palette.primary.main}`,
    borderRadius: ({ language }) => language === 'plain' ? 0 : theme.spacing(0.5),
    padding: ({ language }) => language === 'plain' ? 0 : theme.spacing(1),
    color: ({ language }) => language === 'plain' ? 'inherit' : theme.palette.primary.main,
  },
}));

function MarkdownCodeBlock({ language, value }) {
  const classes = useCodeStyles({ language });

  return <pre className={classes.root}><code>{value}</code></pre>
}

export default MarkdownCodeBlock