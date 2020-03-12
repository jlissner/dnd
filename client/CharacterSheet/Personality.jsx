import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _cloneDeep from 'lodash/cloneDeep';
import _map from 'lodash/map';
import AddButton from '../Form/AddButton';
import TextSection from './TextSection';

function Personality({
  personality,
  updateCharacter,
}) {
  function save(index, newValue) {
    const updatedPersonality = _cloneDeep(personality);

    updatedPersonality[index].text
    TODO::REDO PERSONALITY TO NOT BE LIKE THIS
    TODO::character.personality
        - from [{ text, label }]
        - to 'stright text, let markdown take care of it for now'

    updateCharacter()
  }

  return (
    <Grid container spacing={2}>
      {_map(personality, ({ label, text }, i) => (
        <Grid item xs={12} key={label}>
          <TextSection
            label={label}
            onSave={(newValue) => save(i, newValue)}
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
