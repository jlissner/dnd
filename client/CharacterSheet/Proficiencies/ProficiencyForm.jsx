import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';

function ProficiencyForm({
  setNewVal,
  newVal,
}) {
  const {
    bonusModifier,
    name,
    notes,
    proficient,
    type,
  } = newVal;

  console.log({ newVal })

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setNewVal({ ...newVal, name: e.target.value})}
            value={name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="type"
            onChange={(e) => setNewVal({ ...newVal, type: e.target.value})}
            select
            value={type}
            variant="filled"
          >
            <MenuItem value="str">Strength</MenuItem>
            <MenuItem value="dex">Dexterity</MenuItem>
            <MenuItem value="con">Constitution</MenuItem>
            <MenuItem value="int">Intelligence</MenuItem>
            <MenuItem value="wis">Wisdom</MenuItem>
            <MenuItem value="cha">Charisma</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={proficient}
                onChange={(e) => setNewVal({ ...newVal, proficient: !proficient })}
              />
            )}
            label="Proficient"
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

ProficiencyForm.propTypes = {
  setNewVal: PropTypes.func.isRequired,
  newVal: PropTypes.shape().isRequired,
};

export default ProficiencyForm;
