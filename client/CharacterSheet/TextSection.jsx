import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@material-ui/core';
import EditButton from '../Form/EditButton';
import Markdown from '../Form/Markdown';
import MarkdownInput from '../Form/MarkdownInput';

function TextSection({
  accessor,
  label,
  updateCharacter,
  value,
}) {
  const [editMode, setEditMode] = useState(false);

  const save = useCallback(({ text }) => {
    updateCharacter({ attributes: { [accessor]: text } })
  }, [accessor, updateCharacter]);

  const content = useMemo(() => (
    editMode
      ? <MarkdownInput
          onSave={save}
          onCancel={() => setEditMode(false)}
          value={value}
        />
      : <EditButton onClick={() => setEditMode(true)}>
          <Box
            borderRadius={4}
            p={2}
          >
            <Markdown text={value || 'Nothing here yet...'} />
          </Box>
        </EditButton>
  ), [editMode, save, value])

  useEffect(() => {
    setEditMode(false);
  }, [value])

  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
    >
      <Box bgcolor="background.paper" borderRadius="4px 4px 0 0">
        {content}
      </Box>

      <Box borderColor="rgba(0, 0, 0, 0.42)" borderTop={1} p={2}>
        <Typography align="center" variant="h6">{label}</Typography>
      </Box>
    </Box>
  )
}

TextSection.propTypes = {
  accessor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  value: PropTypes.string,
};

TextSection.defaultProps = {
  value: '',
}

export default TextSection;
