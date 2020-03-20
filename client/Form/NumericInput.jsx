import React from 'react';
import PropTypes from 'prop-types';
import NumberFormater from 'react-number-format';
import getNumericValue from '../utils/getNumericValue';
import getNumericPrefix from '../utils/getNumericPrefix';

function NumericInput({
  inputRef,
  onChange,
  useNumericPrefix,
  prefix,
  value,
  ...props
}) {
  const numericPrefix = useNumericPrefix ? getNumericPrefix(value) : '';
  const prefixToShow = prefix || numericPrefix;

  return (
    <NumberFormater
      {...props}
      getInputRef={inputRef}
      isNumericString
      onValueChange={({ value }) => {onChange({ target: { value: getNumericValue(value) } })}}
      thousandSeparator
      value={value}
      prefix={prefixToShow}
    />
  )
}

NumericInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  useNumericPrefix: PropTypes.bool,
};

NumericInput.defaultProps = {
  useNumericPrefix: false,
}

export default NumericInput;
