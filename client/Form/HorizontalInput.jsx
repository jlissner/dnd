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
  type,
  inputFirst,
}) {
  const Input = useMemo(() => type === 'text' ? TextInput : NumericInput, [type]);
  const labelProps = inputFirst
    ? { borderLeft: 0, borderRadius: '0 4px 4px 0' }
    : { borderRight: 0, borderRadius: '4px 0 0 4px', order: -1 };  

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
      <Box
        bgcolor="background.paper"
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        p={0.25}
        px={1}
        width={1}
        {...labelProps}
      >
        <Typography align="center">{label}</Typography>
      </Box>
    </Grid>
  )
}

HorizontalInput.propTypes = {
  inputFirst: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
};

HorizontalInput.defaultProps = {
  inputFirst: true,
  type: 'text',
};

export default HorizontalInput;
