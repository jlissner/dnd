import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

function Simple({
  children,
  label,
}) {
  return (
    <Box
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      bgcolor="rgba(0, 0, 0, 0.09)"
      p={1}
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
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

Simple.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default Simple;
