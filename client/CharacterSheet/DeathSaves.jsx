import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _fill from 'lodash/fill';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import Radio from '../Form/Radio';

function DeathSaves({
  character,
  updateCharacter,
}) {
  const [saving, setSaving] = useState(false);
  const health = _get(character, 'health', {});
  const deathSaves = _get(health, 'deathSaves', []);
  const numberOfSuccesses = _filter(deathSaves, Boolean).length;
  const numberOfFailures = deathSaves.length - numberOfSuccesses;

  useEffect(() => {
    setSaving(false);
  }, [deathSaves]);

  function save(newDeathSaves) {
    setSaving(true);

    updateCharacter({
      health: {
        ...health,
        deathSaves: newDeathSaves,
      },
    })
  }

  function getNewDeathSaves(index, val, isSuccess) {
    const total = val ? index + 1 : index;
    const newSaves = _fill(Array(total), isSuccess);
    const oldSaves = _filter(deathSaves, (ds) => ds !== isSuccess);

    return [...oldSaves, ...newSaves];
  }

  function handleSuccess(index, val) {
    save(getNewDeathSaves(index, val, true));
  }

  function handleFailure(index, val) {
    save(getNewDeathSaves(index, val, false));
  }

  return (
    <Box border={1} borderColor="rgba(0, 0, 0, 0.42)" p={1.25} borderRadius={4}>
      <Box mb={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography align="right">Successes</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfSuccesses > 0}
                  onClick={(e) => handleSuccess(0, e.target.checked)}
                />
              </Grid>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfSuccesses > 1}
                  onClick={(e) => handleSuccess(1, e.target.checked)}
                />
              </Grid>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfSuccesses > 2}
                  onClick={(e) => handleSuccess(2, e.target.checked)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography align="right">Failures</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfFailures > 0}
                  onClick={(e) => handleFailure(0, e.target.checked)}
                />
              </Grid>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfFailures > 1}
                  onClick={(e) => handleFailure(1, e.target.checked)}
                />
              </Grid>
              <Grid item>
                <Radio
                  disabled={saving}
                  checked={numberOfFailures > 2}
                  onClick={(e) => handleFailure(2, e.target.checked)}
                />
              </Grid>
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
