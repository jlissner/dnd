import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditSpeed from './EditSpeed';
import ViewSpeed from './ViewSpeed';

function Speed({
  character,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(speed) {
    updateCharacter({ speed });
  }

  if (editMode) {
    return (
      <EditSpeed
        onCancel={() => setEditMode(false)}
        onSave={save}
        character={character}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewSpeed
        character={character}
      />
    </EditButton>
  );
}

Speed.propTypes = {
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Speed;
