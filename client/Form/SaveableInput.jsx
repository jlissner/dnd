import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import _noop from 'lodash/noop';
import { Fa } from '../utils';
import FormItem from './FormItem';

const useStyles = makeStyles((theme) => ({
  save: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));

function SaveableInput({
  label,
  savingIndicator,
  onSave,
  saveOnBlur,
  type,
  value,
  ...props
}) {
  const classes = useStyles();
  const [newVal, setNewVal] = useState(value);
  const [saving, setSaving] = useState(false);
  const valueChanged = String(value) !== String(newVal);

  useEffect(() => {
    setSaving(false);
    setNewVal(value);
  }, [value])

  function save() {
    if (valueChanged) {
      setSaving(true);
      onSave(newVal);
    }
  }

  function handleEnter(evt) {
    if (evt.keyCode === 13) {
      save();
    }
  }

  function endAdornment() {
    if (savingIndicator && saving) {
      return <InputAdornment position="end">{savingIndicator}</InputAdornment>
    }

    if (!saveOnBlur && valueChanged) {
      return (
        <InputAdornment
          className={classes.save}
          position="end"
          onClick={save}
        >
          <Fa icon="save" />
        </InputAdornment>
      )
    }

    return null
  }

  return (
    <FormItem
      disabled={saving}
      InputProps={{
        endAdornment: endAdornment(),
      }}
      label={label}
      setValue={setNewVal}
      onBlur={saveOnBlur ? save : _noop}
      onKeyDown={handleEnter}
      type={type}
      value={newVal}
      {...props}
    />
  )
}

SaveableInput.propTypes = {
  label: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  saveOnBlur: PropTypes.bool,
  savingIndicator: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

SaveableInput.defaultProps = {
  label: '',
  type: 'text',
  saveOnBlur: false,
  savingIndicator: <CircularProgress size={16} />,
};

export default SaveableInput;
