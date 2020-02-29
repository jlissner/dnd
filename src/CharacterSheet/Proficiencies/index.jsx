import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import Proficiency from './Proficiency';

function Proficiencies({
  character,
  proficiencies,
  onDelete,
  onSave,
}) {
  return _map(proficiencies, (proficiency) => (
    <Proficiency
      key={proficiency.name}
      character={character}
      proficiency={proficiency}
      onDelete={onDelete}
      onSave={onSave}
    />
  ));
}

Proficiencies.propTypes = {
  proficiencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Proficiencies;
