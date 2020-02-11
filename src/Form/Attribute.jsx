import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Typography,
} from '@material-ui/core';
import NumberFormat from './NumberFormat';

function Attribute({
  name,
  modifier,
  notes,
  value,
}) {
  return (
    <Box border={1} color="grey.800">
      <Typography align="center">{name}</Typography>
      <TextField
        value={value}
        variant="filled"
        fullWidth
      />
      <NumberFormat
        fullWidth
        prefix={modifier > -1 ? '+' : ''}
        value={modifier}
        variant="filled"
      />
    </Box>
  );
}

Attribute.propTypes = {
  name: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Attribute;
