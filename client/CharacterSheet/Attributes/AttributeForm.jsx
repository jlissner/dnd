import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  TextField,
} from '@material-ui/core';

function AttributeForm({
  newVal,
  setNewVal,
}) {
  const {
    name,
    value,
    bonusModifier,
    notes,
  } = newVal;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            label="Name"
            value={name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Value"
            onChange={(e) => setNewVal({ ...newVal, value: e.target.value })}
            value={value}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bonus Modifier"
            onChange={(e) => setNewVal({ ...newVal, bonusModifier: e.target.value })}
            value={bonusModifier}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            onChange={(e) => setNewVal({ ...newVal, notes: e.target.value})}
            value={notes}
            variant="filled"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

AttributeForm.propTypes = {
  newVal: PropTypes.shape().isRequired,
  setNewVal: PropTypes.func.isRequired,
};

export default AttributeForm;
