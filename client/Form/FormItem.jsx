import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from '@material-ui/core';
import _map from 'lodash/map';

function updateTags(tagsText) {
  return tagsText.replace(', ', ',').split(',');
}

function FormItem({
  accessor,
  disabled,
  error,
  fullWidth,
  label,
  options,
  required,
  type,
  updateValue,
  value,
  variant,
}) {
  const defaultProps = {
    disabled,
    fullWidth,
    variant,
    label,
    value,
    error,
    required,
  };

  switch (type) {
    case 'checkbox': {
      return (
        <FormControlLabel
          control={(
            <Checkbox
              checked={value}
              onChange={() => updateValue(!value, accessor)}
              disabled={disabled}
              required={required}
            />
          )}
          label={label}
        />
      );
    }
    case 'select': {
      return (
        <TextField
          {...defaultProps}
          onChange={(evt) => updateValue(evt.target.value, accessor)}
          select
        >
          {_map(options, (option) => (
            <MenuItem
              accessor={option.value}
              key={option.value}
              value={option.value}
            >
              {option.label || option.value}
            </MenuItem>
          ))}
        </TextField>
      );
    }
    case 'number': {
      return (
        <TextField
          {...defaultProps}
          onChange={(evt) => updateValue(parseInt(evt.target.value, 10), accessor)}
        />
      );
    }
    case 'multiline': {
      return (
        <TextField
          {...defaultProps}
          multiline
          onChange={(evt) => updateValue(evt.target.value, accessor)}
        />
      );
    }
    case 'uses': {
      function updateUses(numOfUses) {
        return Array(numOfUses).fill(false).map((use, i) => value[i] || use); 
      }

      return (
        <TextField
          {...defaultProps}
          value={value.length}
          onChange={(evt) => updateValue(updateUses(parseInt(evt.target.value, 10)), accessor)}
        />
      );
    }
    case 'list': {
      function updateUses(numOfUses) {
        return Array(numOfUses).fill(false).map((use, i) => value[i] || use); 
      }

      return (
        <TextField
          {...defaultProps}
          value={value.join(', ')}
          onChange={(evt) => updateValue(updateTags(evt.target.value), accessor)}
        />
      );
    }
    default: {
      return (
        <TextField
          {...defaultProps}
          onChange={(evt) => updateValue(evt.target.value, accessor)}
        />
      );
    }
  }
}

FormItem.propTypes = {
  accessor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
  })),
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ])),
  ]).isRequired,
  variant: PropTypes.string,
};

FormItem.defaultProps = {
  disabled: false,
  error: false,
  fullWidth: true,
  options: [],
  required: false,
  variant: 'filled',
}

export default FormItem;
