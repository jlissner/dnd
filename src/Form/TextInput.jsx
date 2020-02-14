import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

function TextInput({
  value,
  ...props
}) {
  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      component="input"
      display="block"
      p={.5}
      textAlign="center"
      value={value}
      {...props}
    />
  )
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
};

export default TextInput;
