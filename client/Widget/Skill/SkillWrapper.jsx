import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
} from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { Popover } from '../../utils';
import EditableNotePad from '../../EditableNotePad';
import SkillComponent from './SkillComponent';
import useWidget from '../useWidget';

function SkillWrapper({ id }) {
  const notesRef = useRef(null);
  const [element, setElement] = useState(null);
  const { widget, updateDumbValue } = useWidget(id);
  const openNotes = useCallback(() => setElement(notesRef.current), [notesRef]);
  const closeNotes = useCallback(() => setElement(null), []);

  if (!widget) {
    return (
      <Box component={Alert} height={1} severity="errors">
        <AlertTitle>Skill Deleted</AlertTitle>
        You should remove this from your page.
      </Box>
    );
  }

  return (
    <Box height={1} ref={notesRef}>
      <SkillComponent
        id={id}
        handleOpen={openNotes}
      />
      <Popover
        element={element}
        handleClose={closeNotes}
      >
        <Box p={2}>
          <EditableNotePad
            notes={widget.notes}
            onSave={(newNotes) => updateDumbValue('notes', newNotes)}
          />
        </Box>
      </Popover>
    </Box>
  );
}

SkillWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SkillWrapper;
