import React from 'react';
import { useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { popoverState } from '../state';
import Markdown from './index';

const useStyles = makeStyles(() => ({
  word: {
    cursor: 'pointer',
  },
}));

function MarkdownDictionary({ children, definition }) {
  const classes = useStyles();
  const setPopover = useSetRecoilState(popoverState);

  function handleOpen(evt) {
    setPopover({
      anchorEl: evt.currentTarget,
      children: <Box p={2}><Markdown text={definition} /></Box>,
    });
  }

  return (
    <strong
      className={classes.word}
      onClick={handleOpen}
      role="button"
    >
      {children}
    </strong>
  );
}

export default MarkdownDictionary;