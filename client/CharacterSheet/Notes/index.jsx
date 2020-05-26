import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
} from '@material-ui/core';
import { If, Fa } from '../../utils';
import { Markdown } from '../../Displays';

const useStyles = makeStyles(() => ({
  input: {
    // background: 'none',
    // width: '100%',
  },
}));

function Notes({
  notes,
  onSave,
}) {
  const classes = useStyles();
  const [newNotes, setNewNotes] = useState(notes);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSaving(false);
  }, [notes])

  function handleSave() {
    setEditing(false);

    const trimmedNewNotes = newNotes.trim();

    if (trimmedNewNotes === notes) {
      return;
    }

    setSaving(true);
    onSave(newNotes);
  }

  function renderContent() {
    if (editing) {
      return (
        <TextField
          autoFocus
          className={classes.input}
          fullWidth
          onChange={(evt) => setNewNotes(evt.target.value)}
          onBlur={handleSave}
          value={newNotes}
          multiline
        />
      );
    }

    return (
      <Markdown text={newNotes} />
    )
  }

  return (
    <Box
      component="form"
      p={2}
      position="relative"
      onSubmit={handleSave}
      onClick={() => setEditing(true)}
    >
      <Box position="absolute" top={1} right={1}>
        <If conditions={[saving]}>
          <Fa icon="save"/>
        </If>
      </Box>
      {renderContent()}
    </Box>
  )
}

Notes.propTypes = {
  notes: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: '',
};

export default Notes;
