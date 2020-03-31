import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _map from 'lodash/map';
import Attribute from './Attribute';

function Attributes({
  attributes,
  updateCharacter,
}) {
  function saveAttribute(attributeIndex) {
    return (updatedAttribute) => {
      const updatedAttributes = attributes.attributes;

      updatedAttributes[attributeIndex] = updatedAttribute;

      updateCharacter({ attributes: { attributes: updatedAttributes } });
    }
  }

  return (
    <Grid container spacing={3}>
      {_map(attributes.attributes, (attribute, i) => (
        <Grid item xs={12} key={attribute.name}>
          <Attribute attribute={attribute} attributes={attributes} onSave={saveAttribute(i)} />
        </Grid>
      ))}
    </Grid>
  )
}

Attributes.propTypes = {
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Attributes;
