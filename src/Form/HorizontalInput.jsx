import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
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
  onChange,
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
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Box p={0.25} border={1} borderColor="rgba(0, 0, 0, 0.42)" borderLeft={0}>
          <Typography align="center">{label}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

HorizontalInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default HorizontalInput;
