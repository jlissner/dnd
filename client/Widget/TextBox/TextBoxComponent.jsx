import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import { useDoubleClick } from '../../hooks';
import { If, Fa, Scrollbars } from '../../utils';
import Markdown from '../../Markdown';
import useTextBox from './useTextBox';

function TextBoxComponent({
  id,
}) {
  const {
    textBox,
    saving,
    saveText,
  } = useTextBox(id);
  const [newText, setNewText] = useState(textBox.text);
  const [editing, setEditing] = useState(false);
  const onDoubleClick = useCallback(() => setEditing(true), []);
  const handleDoubleClick = useDoubleClick(onDoubleClick);

  useEffect(() => {
    setNewText(textBox.text);
  }, [textBox.text]);

  async function handleSave() {

    const trimmedNewNotes = newText.trim();

    if (trimmedNewNotes === textBox.text) {
      setEditing(false);

      return;
    }

    try {
      await saveText(trimmedNewNotes);
    } catch (error) {
      setNewText(textBox.text);
    }
    
    setEditing(false);
  }

  function renderContent() {
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
      <Markdown text={newText} update={saveText} />
    )
  }

  return (
    <Box component={Paper} height={1} display="flex" flexDirection="column">
      <If conditions={[textBox.showTitle]}>
        <Box p={2}>
          <Typography variant="h5">{textBox.name}</Typography>
        </Box>
      </If>
      <Divider />
      <Scrollbars>
        <Box
          component="form"
          p={2}
          height={1}
          position="relative"
          onSubmit={handleSave}
          onClick={handleDoubleClick}
        >
          <Box position="absolute" top={1} right={1}>
            <If conditions={[saving]}>
              <Fa icon="save"/>
            </If>
          </Box>
          {renderContent()}
        </Box>
      </Scrollbars>
    </Box>
  )
}

TextBoxComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TextBoxComponent;
