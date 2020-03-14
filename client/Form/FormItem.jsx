import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import _filter from 'lodash/filter';
import _isNaN from 'lodash/isNaN';
import _last from 'lodash/last';
import _map from 'lodash/map';
import _xor from 'lodash/xor';
import If from '../utils/If';
import AddButton from './AddButton';

function getNumericValue(text, defaultValue = 0) {
  const textToParse = text[0] === '0' && text.length > 1 ? text.substring(1) : text;
  
  if (textToParse === '-') {
    return textToParse;
  }

  const value = parseInt(text, 10);

  return _isNaN(value) ? defaultValue : value;
}

function updateTags(tagsText) {
  return tagsText.replace(', ', ',').split(',');
}

function FormItem({
  accessor,
  disabled,
  error,
  helperText,
  fullWidth,
  label,
  options,
  required,
  title,
  type,
  updateValue,
  value,
  variant,
}) {
  const defaultProps = {
    disabled,
    fullWidth,
    helperText,
    variant,
    label,
    value,
    error,
    required,
  };
  const titleComp = useMemo(() => (
    <If conditions={[Boolean(title)]}>
      <Typography variant="h6">{title}</Typography>
    </If>
  ), [title]);
  const input = useMemo(() => {
    switch (type) {
      case 'divider': {
        return <Divider />
      }
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
      case 'checkbox-select': {
        return (
          <Grid container>
            {_map(options, (opt) => (
              <Grid key={opt.value} item xs={12}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={value.indexOf(opt.value) > -1}
                      onChange={() => updateValue(_xor(value, [opt.value]), accessor)}
                      disabled={disabled}
                      required={required}
                    />
                  )}
                  label={opt.label}
                />
              </Grid>
            ))}
          </Grid>
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
            onChange={(evt) => updateValue(getNumericValue(evt.target.value), accessor)}
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
          try {
            return Array(numOfUses).fill(false).map((use, i) => value[i] || use); 
          } catch (err) {
            return [];
          }
        }

        return (
          <TextField
            {...defaultProps}
            value={value.length}
            onChange={(evt) => updateValue(updateUses(getNumericValue(evt.target.value)), accessor)}
          />
        );
      }
      case 'modifiers': {
        return (
          <>
            {_map(value, (mod, i) => (
              <Grid container key={i} wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>
                  <Checkbox
                    style={{ padding: 0 }}
                    checked={mod.active}
                    onChange={() => updateValue(_map(value, (v, j) => (i === j ? {...v, active: !mod.active} : v)), accessor)}
                    disabled={disabled}
                    required={required}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    value={mod.value}
                    onChange={(evt) => updateValue(_map(value, (v, j) => (i === j ? {...v, value: getNumericValue(evt.target.value)} : v)), accessor)}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    value={mod.name}
                    onChange={(evt) => updateValue(_map(value, (v, j) => (i === j ? {...v, name: evt.target.value} : v)), accessor)}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => updateValue(_filter(value, (v, j) => j !== i), accessor)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <AddButton
              disabled={!_last(value).name}
              onAdd={() => updateValue([...value, { active: false, name: '', value: 0 }], accessor)}
            />
          </>
        )
      }
      case 'list': {
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
  }, [accessor, disabled, error, fullWidth, label, options, required, type, updateValue, value, variant])

  return (
    <>
      {titleComp}
      {input}
    </>
  )
}

FormItem.propTypes = {
  accessor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
  })),
  required: PropTypes.bool,
  title: PropTypes.string.isRequired,
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
  ]),
  variant: PropTypes.string,
};

FormItem.defaultProps = {
  disabled: false,
  error: false,
  fullWidth: true,
  options: [],
  required: false,
  title: '',
  helperText: '',
  variant: 'filled',
  value: '',
}

export default FormItem;
