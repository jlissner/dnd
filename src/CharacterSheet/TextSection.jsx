import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@material-ui/core';
import EditButton from '../Form/EditButton';
import Markdown from '../Form/Markdown';
import MarkdownInput from '../Form/MarkdownInput';

function TextSection({
  label,
  onSave,
  value,
}) {
  const [editMode, setEditMode] = useState(false);
  const content = useMemo(() => (
    editMode
      ? <MarkdownInput
          onSave={onSave}
          onCancel={() => setEditMode(false)}
          value={value}
        />
      : <EditButton onClick={() => setEditMode(true)}>
          <Box
            bgcolor="rgba(0, 0, 0, 0.09)"
            borderRadius={4}
            mb={1}
            p={1}
          >
            <Markdown text={value || 'Nothing here yet...'} />
          </Box>
        </EditButton>
  ), [editMode, onSave, value])

  useEffect(() => {
    setEditMode(false);
  }, [value])

  return (
    <Box border={1} p={1} borderColor="rgba(0, 0, 0, 0.42)" borderRadius={4}>
      {content}

      <Typography align="center" variant="h6">{label}</Typography>
    </Box>
  )
}

TextSection.propTypes = {
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  value: PropTypes.string,
};

TextSection.defaultProps = {
  onSave: null,
  value: '',
}

export default TextSection;
