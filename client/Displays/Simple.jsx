import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import _noop from 'lodash/noop';
import useNotes from '../hooks/useNotes';

const useStyles = makeStyles(() => ({
  title: {
    cursor: hasNotes => (hasNotes ? 'pointer' : 'default'),

    '&:hover': {
      backgroundColor: hasNotes => (hasNotes ? 'rgba(0, 0, 0, 0.09)' : 'none'),
    },
  },
}));

function Simple({
  children,
  hasNotes,
  label,
  notes,
}) {
  const classes = useStyles(hasNotes);
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
      >
        <Box
          border={1}
          borderColor="rgba(0, 0, 0, 0.42)"
          borderRadius={4}
          bgcolor="background.paper"
        >
          {children}
        </Box>
        <Box mt={1} className={classes.title} onClick={hasNotes ? openNotes : _noop}>
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
