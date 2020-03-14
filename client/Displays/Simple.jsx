import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import _noop from 'lodash/noop';
import useNotes from '../hooks/useNotes';

function Simple({
  children,
  hasNotes,
  label,
  notes,
}) {
  const [ref, openNotes, notesComponent] = useNotes(notes);

  return (
    <>
      <Box
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        borderRadius={4}
        bgcolor="rgba(0, 0, 0, 0.09)"
        p={1}
        ref={ref}
        onClick={hasNotes ? openNotes : _noop}
      >
        <Box
          border={1}
          borderColor="rgba(0, 0, 0, 0.42)"
          borderRadius={4}
          bgcolor="background.paper"
        >
          {children}
        </Box>
        <Box pt={1}>
          <Typography align="center" variant="body2">
            {label}{notes ? '*' : ''}
          </Typography>
        </Box>
      </Box>
      {notesComponent}
    </>
  )
}

Simple.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  notes: PropTypes.string,
  hasNotes: PropTypes.bool,
};

Simple.defaultProps = {
  notes: '',
  hasNotes: true,
}

export default Simple;
