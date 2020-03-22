import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import { getNumericPrefix } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.09)',
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
}));

function getClassName(num) {
  if (num === 0) {
    return 'zero';
  }

  return num > 0 ? 'positive' : 'negative';
}

function HealthHistory({
  history,
  startHealth,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography align="right">{startHealth}</Typography>
      </Grid>
      {_map(history, ({ modifier, newTotal }, i) => (
        <React.Fragment key={i}>
          <Grid item xs={12}>
            <Typography align="right" className={classes[getClassName(modifier)]}>
              {getNumericPrefix(modifier)}{modifier}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography align="right">
              {newTotal}
            </Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  )
}

HealthHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    modifier: PropTypes.number.isRequired,
    newTotal: PropTypes.number.isRequired,
  })).isRequired,
  startHealth: PropTypes.number,
};

export default HealthHistory;
