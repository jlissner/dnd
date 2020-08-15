import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  InputBase,
} from '@material-ui/core';
import _trim from 'lodash/trim';
import { Markdown } from '../Displays';
import { useDoubleClick } from '../hooks';
import { Fa, If } from '../utils';

function EditableNotePad({
  notes,
  onSave,
}) {
  const [updatedNotes, setUpdatedNotes] = useState(notes);
  const [editing, setEditing] = useState(false);
  const handleDoubleClick = useDoubleClick(() => setEditing(true));
  const saving = updatedNotes !== notes && !editing;

  useEffect(() => {
    setUpdatedNotes(notes);
  }, [notes]);

  async function handleSave() {
    setEditing(false);

    const trimmedNotes = _trim(updatedNotes);

    if (notes === trimmedNotes) {
      return;
    }

    try {
      await onSave(trimmedNotes);
      
    } catch (error) {
      console.error(error);

      setUpdatedNotes(notes);
    }
  }

  if (editing) {
    return (
      <InputBase
        autoFocus
        fullWidth
        multiline
        onBlur={handleSave}
        onChange={(evt) => setUpdatedNotes(evt.target.value)}
        value={updatedNotes}
      />
    );
  }

  return (
    <Box onClick={handleDoubleClick} position="relative" height={1}>
      <If conditions={[saving]}>
        <Box position="absolute" top={0} right={0} zIndex={1}>
          <Fa icon="save" />
        </Box>
      </If>
      <Markdown defaultText="No notes yet..." text={updatedNotes} />
    </Box>
  );
}

EditableNotePad.propTypes = {
  notes: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

EditableNotePad.defaultProps = {
  notes: '',
};

export default EditableNotePad;
