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

function Section({
  children,
  hasNotes,
  label,
  notes,
  ...props
}) {
  const classes = useStyles(hasNotes);
  const [ref, openNotes, notesComponent] = useNotes(notes);

  return (
    <Box
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      bgcolor="rgba(0, 0, 0, 0.09)"
      ref={ref}
      {...props}
    >
      <Box
        bgcolor="background.paper"
        borderRadius="4px 4px 0 0"
      >
        {children}
      </Box>

      <Box
        className={classes.title}
        onClick={hasNotes ? openNotes : _noop}
        borderColor="rgba(0, 0, 0, 0.42)"
        borderTop={1}
        p={2}
      >
        <Typography align="center" variant="h6">
          {label}{notes ? '*' : ''}
        </Typography>
      </Box>
      {notesComponent}
    </Box>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  hasNotes: PropTypes.bool,
  label: PropTypes.string.isRequired,
  notes: PropTypes.string,
};

Section.defaultProps = {
  notes: '',
  hasNotes: true,
}

export default Section;
