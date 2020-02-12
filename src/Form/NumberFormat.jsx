import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { FilledInput, FormControl, InputLabel } from '@material-ui/core';
import _pick from 'lodash/pick';

function NumberFormat(props) {
  const { prefix, thousandSeparator, ...rest } = props;

  // return `
  //   maybe use instead of InputProps, FormControl
  //   https://material-ui.com/api/form-control/`;

  return (
      <FilledInput
        {...rest}
        InputProps={{ inputComponent: ({ inputRef, onChange, ...passedProps }) => (
          <ReactNumberFormat
            getInputRef={inputRef}
            onValueChange={({ value }) => onChange({ target: { value } })}
            prefix={prefix}
            thousandSeparator={thousandSeparator}
            {...passedProps}
          />
        )}}
      />
  )
}

NumberFormat.propTypes = {
  onChange: PropTypes.func.isRequired,
};

NumberFormat.defaultProps = {
  onChange: () => {},
};

export default NumberFormat;
