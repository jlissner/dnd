import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase } from '@material-ui/core';
import { useDoubleClick } from '../hooks';
import { Fa, If } from '../utils';
import Markdown from '../Markdown';

function EditableMarkdown({
  text,
  update,
}) {
  const [newText, setNewText] = useState(text);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const onDoubleClick = useCallback(() => setEditing(true), []);
  const handleDoubleClick = useDoubleClick(onDoubleClick);

  async function handleSave() {
    const trimmedNewText = newText.trim();

    if (trimmedNewText === text) {
      setEditing(false);

      return;
    }

    setSaving(true);

    try {
      await update(trimmedNewText);
    } catch (error) {
      setNewText(text);
    }

    setSaving(false);
    setEditing(false);
  }

  if (editing) {
    return (
      <InputBase
        autoFocus
        fullWidth
        multiline
        onChange={(evt) => setNewText(evt.target.value)}
        onBlur={handleSave}
        value={newText}
      />
    );
  }

  return (
    <Box
      position="relative"
      onClick={handleDoubleClick}
    >
      <Box position="absolute" top={1} right={1}>
        <If conditions={[saving]}>
          <Fa icon="save"/>
        </If>
      </Box>
      <Markdown text={newText} update={update} />
    </Box>
  )
}

EditableMarkdown.propTypes = {
  text: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default EditableMarkdown;
