import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
} from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { Popover } from '../../utils';
import EditableNotePad from '../../EditableNotePad';
import StatBasic from './StatBasic';
import StatTracker from './StatTracker';
import useStat from './useStat';

function StatComponent({ id }) {
  const notesRef = useRef(null);
  const [element, setElement] = useState(null);
  const { stat, updateStatNotes } = useStat(id);
  const View = stat.type === 'BASIC' ? StatBasic : StatTracker;
  const openNotes = useCallback(() => setElement(notesRef.current), [notesRef]);
  const closeNotes = useCallback(() => setElement(null), []);

  if (!stat) {
    return (
      <Box component={Alert} height={1} severity="errors">
        <AlertTitle>Stat Deleted</AlertTitle>
        You should remove this from your page.
      </Box>
    );
  }

  return (
    <Box height={1}>
      <View id={id} notesRef={notesRef} handleOpen={openNotes} />
      <Popover
        element={element}
        handleClose={closeNotes}
      >
        <Box p={2}>
          <EditableNotePad
            notes={stat.notes}
            onSave={updateStatNotes}
          />
        </Box>
      </Popover>
    </Box>
  );
}

StatComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StatComponent;
