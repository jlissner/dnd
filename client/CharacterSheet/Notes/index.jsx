import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
} from '@material-ui/core';
import { If, Fa } from '../../utils';
import { Markdown } from '../../Displays';

function Notes({
  notes,
  onSave,
}) {
  const [newNotes, setNewNotes] = useState(notes || '');
  const [doubleClicking, setDoubleClicking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSaving(false);
  }, [notes]);

  useEffect(() => {
    const checkDoubleClick = setTimeout(() => {
      setDoubleClicking(false);
    }, 200);

    return () => {
      clearTimeout(checkDoubleClick);
    }
  }, [doubleClicking, setDoubleClicking]);

  function handleSave() {
    setEditing(false);

    const trimmedNewNotes = newNotes.trim();

    if (trimmedNewNotes === notes) {
      return;
    }

    setSaving(true);
    onSave(trimmedNewNotes);
  }

  function doubleClick() {
    if (doubleClicking) {
      setEditing(true);
    } else {
      setDoubleClicking(true);
    }
  }

  function renderContent() {
    if (editing) {
      return (
        <TextField
          autoFocus
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
      onClick={doubleClick}
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
