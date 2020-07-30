import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _noop from 'lodash/noop';
import SaveableInput from './SaveableInput';

const useStyles = makeStyles((theme) => ({
  input: {
    background: 'rgba(0, 0, 0, 0.09)',
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(.5),
    height: theme.spacing(6),
    width: theme.spacing(6),

    '& > div:before': {
      display: 'none',
    },
    '& > div:after': {
      display: 'none',
    },

    '& input': {
      padding: 0,
      textAlign: 'center',
    },
  },
}))

function HorizontalInput({
  label,
  value,
  type,
  inputFirst,
  onSave,
  useNumericPrefix,
  ...props
}) {
  const classes = useStyles();
  const labelProps = inputFirst
    ? { borderLeft: 0, borderRadius: '0 4px 4px 0' }
    : { borderRight: 0, borderRadius: '4px 0 0 4px', order: -1 };

  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.root}>
      <Grid item>
        <SaveableInput
          type={type}
          value={value}
          variant="standard"
          className={classes.input}
          onSave={onSave}
          saveOnBlur
          savingIndicator=""
          inputProps={{
            useNumericPrefix,
          }}
          {...props}
        />
      </Grid>
      <Box
        bgcolor="background.paper"
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        p={0.25}
        px={1}
        width={1}
        {...labelProps}
      >
        <Typography align="center">{label}</Typography>
      </Box>
    </Grid>
  )
}

HorizontalInput.propTypes = {
  inputFirst: PropTypes.bool,
  useNumericPrefix: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
};

HorizontalInput.defaultProps = {
  inputFirst: false,
  useNumericPrefix: true,
  type: 'text',
  onSave: _noop,
};

export default HorizontalInput;
