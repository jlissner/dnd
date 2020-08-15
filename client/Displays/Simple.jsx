import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
  },
}));

function Simple({
  children,
  handleOpen,
  label,
  notes,
  notesRef,
  ...props
}) {
  const classes = useStyles();

  return (
    <Box
      ref={notesRef}
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      bgcolor="rgba(0, 0, 0, 0.09)"
      p={1}
      height={1}
      {...props}
    >
      <Box
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        borderRadius={4}
        bgcolor="background.paper"
      >
        {children}
      </Box>
      <Box mt={1} className={classes.title} onClick={handleOpen}>
        <Typography align="center" variant="body2" className="content-header">
          {label}{notes ? '*' : ''}
        </Typography>
      </Box>
    </Box>
  )
}

Simple.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  notes: PropTypes.string,
  handleOpen: PropTypes.func.isRequired,
};

Simple.defaultProps = {
  notes: '',
}

export default Simple;
