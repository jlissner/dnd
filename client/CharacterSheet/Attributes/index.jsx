import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _map from 'lodash/map';
import Attribute from './Attribute';

function Attributes({
  character,
  onSave,
}) {
  return (
    <Grid container spacing={3}>
      {_map(character.attributes, (attribute, i) => (
        <Grid item xs={12} key={attribute.name}>
          <Attribute attribute={attribute} character={character} onSave={onSave} />
        </Grid>
      ))}
    </Grid>
  )
}

Attributes.propTypes = {
  character: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Attributes;
