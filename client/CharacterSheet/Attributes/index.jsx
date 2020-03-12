import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _map from 'lodash/map';
import Attribute from './Attribute';

function Attributes({
  character,
  updateCharacter,
}) {
  function saveAttribute(attributeIndex) {
    return (updatedAttribute) => {
      const updatedAttributes = character.attributes;

      updatedAttributes[attributeIndex] = updatedAttribute;

      updateCharacter({ ...character, attributes: updatedAttributes });
    }
  }

  return (
    <Grid container spacing={3}>
      {_map(character.attributes, (attribute, i) => (
        <Grid item xs={12} key={attribute.name}>
          <Attribute attribute={attribute} character={character} onSave={saveAttribute(i)} />
        </Grid>
      ))}
    </Grid>
  )
}

Attributes.propTypes = {
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Attributes;
