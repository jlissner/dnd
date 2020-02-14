import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { Box } from '@material-ui/core';

function NumericInput({
  value,
  ...props
}) {
  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      component={ReactNumberFormat}
      display="block"
      p={.5}
      textAlign="center"
      value={value}
      {...props}
    />
  )
}

NumericInput.propTypes = {
  value: PropTypes.number.isRequired,
};

export default NumericInput;
