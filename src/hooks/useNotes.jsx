import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Popover,
} from '@material-ui/core';
import Markdown from '../Form/Markdown';
import EditButton from '../Form/EditButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 300,
    overflow: 'visible',
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
      <EditButton onClick={() => alert('make me work')}>
        <Box p={1}>
          <Markdown text={notes || 'Add Notes'} />
        </Box>      
      </EditButton>
    </Popover>
  );

  return [ref, openNotes, notesComponent]
}

export default useNotes;
