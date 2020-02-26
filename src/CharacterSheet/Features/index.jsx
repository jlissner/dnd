import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import AddButton from '../../Form/AddButton';
import AdvancedTextSection from '../AdvancedTextSection';

function Features({
  features,
  onSave,
  onDelete,
}) {
  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      borderRadius={4}
      p={2}
    >
      <Grid container spacing={2}>
        {_map(features, (feature) => (
          <Grid item xs={12} key={feature.name}>
            <AdvancedTextSection
              onDelete={onDelete}
              onSave={onSave}
              {...feature}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <AddButton onClick={() => alert('make me work!')} />
        </Grid>

        <Grid item xs={12}>
          <Typography align="center" variant="h6">Features &amp; Traits</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

Features.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Features;
