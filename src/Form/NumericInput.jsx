import React from 'react';
import ReactNumberFormat from 'react-number-format';
import TextInput from './TextInput';

function NumericInput(props) {
  return (
    <TextInput
      component={ReactNumberFormat}
      {...props}
    />
  )
}

export default NumericInput;
