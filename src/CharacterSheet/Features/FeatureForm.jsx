import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  TextField,
} from '@material-ui/core';

function updateTags(tagsText) {
  return tagsText.replace(', ', ',').split(',');
}

function FeatureForm({
  newVal,
  setNewVal,
}) {
  function updateUses(numOfUses) {
    return Array(numOfUses).fill(false).map((use, i) => newVal.uses[i] || use); 
  }

  return (
    <Box
      bgcolor="background.paper"
      p={1}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setNewVal({ ...newVal, name: e.target.value })}
            value={newVal.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Uses"
            onChange={(e) => setNewVal({ ...newVal, uses: updateUses(parseInt(e.target.value, 10)) })}
            value={newVal.uses.length}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Desc."
            multiline
            onChange={(e) => setNewVal({ ...newVal, shortDesc: e.target.value })}
            value={newVal.shortDesc}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Long Desc."
            multiline
            onChange={(e) => setNewVal({ ...newVal, longDesc: e.target.value })}
            value={newVal.longDesc}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="tags"
            onChange={(e) => setNewVal({ ...newVal, tags: updateTags(e.target.value) })}
            value={newVal.tags.join(', ')}
            variant="filled"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

FeatureForm.propTypes = {
  newVal: PropTypes.shape().isRequired,
  setNewVal: PropTypes.func.isRequired,
};

export default FeatureForm;
