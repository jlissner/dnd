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
import _last from 'lodash/last';
import _map from 'lodash/map';
import _noop from 'lodash/noop';
import _omit from 'lodash/omit';
import _trimStart from 'lodash/trimStart';
import _xor from 'lodash/xor';
import If from '../utils/If';
import getNumericValue from '../utils/getNumericValue';
import AddButton from './AddButton';
import NumericInput from './NumericInput';

function updateTags(tagsText) {
  return tagsText
    .replace(', ', ',')
    .split(',')
    .map(_trimStart);
}

function FormItem({
  formValue,
  conditions,
  disabled,
  error,
  helperText,
  fullWidth,
  inputProps,
  InputProps,
  label,
  onEnter,
  options,
  required,
  text,
  title,
  type,
  setValue,
  value,
  variant,
  ...props
}) {
  function handleEnter(evt) {
    if (evt.keyCode === 13) {
      onEnter();
    }
  }

  const disableFormItem = _map(conditions, (val, key) => formValue[key] !== val).filter(Boolean).length > 0;
  const defaultProps = {
    disabled: disabled || disableFormItem,
    error,
    fullWidth,
    helperText,
    InputProps,
    label,
    required,
    variant,
    value,
    onKeyDown: handleEnter,
  };
  const inputPropsForAll = _omit(inputProps, ['useNumericPrefix', 'prefix']);
  const titleComp = useMemo(() => (
    <If conditions={[Boolean(title)]}>
      <Typography variant="h6">{title}</Typography>
    </If>
  ), [title]);


  function renderInput() {
    switch (type) {
      case 'divider': {
        return <Divider />
      }
      case 'static-text': {
        return <Typography variant={variant}>{text}</Typography>
      }
      case 'checkbox': {
        return (
          <FormControlLabel
            control={(
              <Checkbox
                checked={value}
                onChange={() => setValue(!value)}
                disabled={defaultProps.disabled}
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
                      onChange={() => setValue(_xor(value, [opt.value]))}
                      disabled={defaultProps.disabled}
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
            {...props}
            onChange={(evt) => setValue(evt.target.value)}
            select
          >
            {_map(options, (option) => (
              <MenuItem
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
            {...props}
            onChange={(evt) => setValue(evt.target.value)}
            InputProps={{
              inputComponent: NumericInput,
              ...InputProps,
            }}
            inputProps={inputProps}
          />
        );
      }
      case 'multiline': {
        return (
          <TextField
            {...defaultProps}
            {...props}
            multiline
            onChange={(evt) => setValue(evt.target.value)}
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
            {...props}
            inputProps={inputPropsForAll}
            value={value.length}
            onChange={(evt) => setValue(updateUses(getNumericValue(evt.target.value)))}
          />
        );
      }
      case 'modifiers': {
        const addButtonDisabled = value.length
          ? !_last(value).name
          : false;

        return (
          <>
            {_map(value, (mod, i) => (
              <Grid container key={i} wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>
                  <Checkbox
                    style={{ padding: 0 }}
                    checked={mod.active}
                    onChange={() => setValue(_map(value, (v, j) => (i === j ? {...v, active: !mod.active} : v)))}
                    disabled={defaultProps.disabled}
                    required={required}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    value={mod.value}
                    onChange={(evt) => setValue(_map(value, (v, j) => (i === j ? {...v, value: getNumericValue(evt.target.value)} : v)))}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    value={mod.name}
                    onChange={(evt) => setValue(_map(value, (v, j) => (i === j ? {...v, name: evt.target.value} : v)))}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => setValue(_filter(value, (v, j) => j !== i))}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <AddButton
              disabled={addButtonDisabled}
              onAdd={() => setValue([...value, { active: false, name: '', value: 0 }])}
            />
          </>
        )
      }
      case 'list': {
        return (
          <TextField
            {...defaultProps}
            {...props}
            inputProps={inputPropsForAll}
            value={value.join(', ')}
            onChange={(evt) => setValue(updateTags(evt.target.value))}
          />
        );
      }
      default: {
        return (
          <TextField
            {...defaultProps}
            {...props}
            inputProps={inputPropsForAll}
            onChange={(evt) => setValue(evt.target.value)}
          />
        );
      }
    }
  }

  return (
    <>
      {titleComp}
      {renderInput()}
    </>
  )
}

FormItem.propTypes = {
  formValue: PropTypes.shape(),
  conditions: PropTypes.shape(),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  inputProps: PropTypes.shape(),
  InputProps: PropTypes.shape(),
  label: PropTypes.string,
  onEnter: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.shape(),
    ]),
  })),
  required: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ])),
    PropTypes.shape(),
  ]),
  variant: PropTypes.string,
};

FormItem.defaultProps = {
  formValue: {},
  conditions: {},
  disabled: false,
  error: false,
  fullWidth: true,
  helperText: '',
  inputProps: {},
  InputProps: {},
  label: '',
  onEnter: _noop,
  options: [],
  required: false,
  text: '',
  type: 'text',
  title: '',
  variant: 'filled',
  value: '',
}

export default FormItem;
