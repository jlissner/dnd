import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _map from 'lodash/map';
import AddButton from '../Form/AddButton';
import TextSection from './TextSection';

function Personality({
  personality,
}) {
  return (
    <Grid container spacing={2}>
      {_map(personality, ({ label, text }) => (
        <Grid item xs={12} key={label}>
          <TextSection
            label={label}
            onSave={() => console.log('make me work')}
            value={text}
          />
        </Grid>
      ))}
      
      <Grid item xs={12}>
        <AddButton />
      </Grid>
    </Grid>
  )
}

Personality.propTypes = {
  personality: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Personality;
