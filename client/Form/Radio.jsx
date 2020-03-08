import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 0,
  }
}));

function Radio({
  checked,
  ...props
}) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      icon={<RadioButtonUnchecked />}
      checkedIcon={<RadioButtonChecked />}
      {...props}
    />
  )
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Radio;
