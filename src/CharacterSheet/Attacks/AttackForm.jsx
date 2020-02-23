import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  TextField,
} from '@material-ui/core';
import _toNumber from 'lodash/toNumber';

function AttackForm({
  newVal,
  setNewVal,
}) {
  const {
    name,
    uses,
    dmg,
    dmgType,
    range,
    modifier,
    modType,
    notes, // 'All creatures in a 20ft radius need to make a DEX save',
    proficient, // false,
  } = newVal;

  function updateVal(val) {
    setNewVal({ ...newVal, ...val });
  }

  function updateUses(numOfUses) {
    return Array(numOfUses).fill(false).map((use, i) => uses[i] || use); 
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => updateVal({ name: e.target.value })}
            value={name}
            variant="filled"
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Uses"
            onChange={(e) => setNewVal({ ...newVal, uses: updateUses(parseInt(e.target.value, 10)) })}
            value={uses.length}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="To Hit"
            onChange={(e) => updateVal({ modType: e.target.value })}
            value={modType}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Range"
            onChange={(e) => updateVal({ range: e.target.value })}
            value={range}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Damage"
            onChange={(e) => updateVal({ dmg: e.target.value })}
            value={dmg}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Damage Type"
            onChange={(e) => updateVal({ dmgType: e.target.value })}
            value={dmgType}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Modifier"
            onChange={(e) => updateVal({ modifier: _toNumber(e.target.value) })}
            value={modifier}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="notes"
            multiline
            onChange={(e) => updateVal({ notes: e.target.value })}
            value={notes}
            variant="filled"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

AttackForm.propTypes = {
  newVal: PropTypes.shape().isRequired,
  setNewVal: PropTypes.func.isRequired,
};

export default AttackForm;
