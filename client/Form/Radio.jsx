import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { Fa } from '../utils';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 0,
  },
  checkedIcon: {
    '--fa-primary-color': theme.palette.secondary.main,
    '--fa-secondary-color': theme.palette.secondary.main,
    '--fa-secondary-opacity': '1.0',
    '--fa-primary-opacity': '0.75',
  },
}));

function Radio({
  checked,
  IconProps,
  ...props
}) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      icon={<Fa icon={['far', 'circle']} {...IconProps} />}
      checkedIcon={<Fa icon={['fad', 'circle']} className={classes.checkedIcon} {...IconProps} />}
      {...props}
    />
  )
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  IconProps: PropTypes.shape(),
};

Radio.defaultProps = {
  IconProps: {},
};

export default Radio;
