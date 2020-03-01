import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _noop from 'lodash/noop';
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
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
};

Proficiencies.propTypes = {
  onDelete: _noop,
};

export default Proficiencies;
