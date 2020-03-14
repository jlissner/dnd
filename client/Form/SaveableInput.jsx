import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import _noop from 'lodash/noop';

const useStyles = makeStyles((theme) => ({
  save: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));

function SaveableInput({
  label,
  onSave,
  saveOnBlur,
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

  function endAdornment() {
    if (saving) {
      return <InputAdornment position="end"><CircularProgress size={16} /></InputAdornment>
    }

    if (!saveOnBlur && valueChanged) {
      return (
        <InputAdornment
          className={classes.save}
          position="end"
          onClick={save}
        >
          <SaveIcon />
        </InputAdornment>
      )
    }

    return null
  }

  return (
    <TextField
      disabled={saving}
      fullWidth
      InputProps={{
        endAdornment: endAdornment(),
      }}
      label={label}
      onChange={(evt) => setNewVal(evt.target.value)}
      onBlur={saveOnBlur ? save : _noop}
      value={newVal}
      variant="filled"
      {...props}
    />
  )
}

SaveableInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  saveOnBlur: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

SaveableInput.defaultProps = {
  saveOnBlur: false,
};

export default SaveableInput;
