import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import Radio from '../Form/Radio';

function DeathSaves({
  deathSaves,
}) {
  const numberOfSuccesses = deathSaves.filter(Boolean).length;
  const numberOfFailures = deathSaves.length - numberOfSuccesses;

  return (
    <Box border={1} borderColor="rgba(0, 0, 0, 0.42)" p={1.25}>
      <Box mb={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography align="right">Successes</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item><Radio checked={numberOfSuccesses > 0} onClick={() => {}} /></Grid>
              <Grid item><Radio checked={numberOfSuccesses > 1} onClick={() => {}} /></Grid>
              <Grid item><Radio checked={numberOfSuccesses > 2} onClick={() => {}} /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography align="right">Failures</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item><Radio checked={numberOfFailures > 0} onClick={() => {}} /></Grid>
              <Grid item><Radio checked={numberOfFailures > 1} onClick={() => {}} /></Grid>
              <Grid item><Radio checked={numberOfFailures > 2} onClick={() => {}} /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Typography align="center" variant="h6">Death Saves</Typography>
    </Box>
  )
}

DeathSaves.propTypes = {
  deathSaves: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default DeathSaves;
