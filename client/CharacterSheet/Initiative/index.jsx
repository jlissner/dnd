import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditInitiative from './EditInitiative';
import ViewInitiative from './ViewInitiative';

function Initiative({
  character,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(initiative) {
    updateCharacter({ initiative });
  }

  if (editMode) {
    return (
      <EditInitiative
        onCancel={() => setEditMode(false)}
        onSave={save}
        character={character}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewInitiative
        character={character}
      />
    </EditButton>
  );
}

Initiative.propTypes = {
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Initiative;
