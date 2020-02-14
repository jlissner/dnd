import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import getNumericPrefix from '../utils/getNumericPrefix';
import NumericInput from './NumericInput';
import TextInput from './TextInput';

function HorizontalInput({
  label,
  value,
}) {
  const inputType = typeof value;
  const Input = useMemo(() => inputType === 'string' ? TextInput : NumericInput, [inputType]);

  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Grid item>
        <Input
          value={value}
          prefix={getNumericPrefix(value)}
          width="48px"
          height="48px"
        />
      </Grid>
      <Grid item xs={12}>
        <Box p={0.25} border={1} borderColor="grey.500">
          <Typography align="center">{label}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

HorizontalInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default HorizontalInput;
