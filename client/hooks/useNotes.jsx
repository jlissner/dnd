import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Popover,
} from '@material-ui/core';
import Markdown from '../Displays/Markdown';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    overflow: 'ellipsis',
    textOverflow: 'ellipsis',

  },
}));

function useNotes(notes) {
  const [element, setElement] = useState(null);
  const ref = useRef({});
  const classes = useStyles();

  function openNotes() {
    setElement(ref.current);
  }

  const notesComponent = (
    <Popover
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={Boolean(element)}
      anchorEl={element}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={() => setElement(null)}
    >
      <Box p={1}>
        <Markdown text={notes || 'No Notes'} />
      </Box>
    </Popover>
  );

  return [ref, openNotes, notesComponent]
}

export default useNotes;
