import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditSpeed from './EditSpeed';
import ViewSpeed from './ViewSpeed';

function Speed({
  attributes,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(speed) {
    updateCharacter({ attributes: { speed } });
  }

  if (editMode) {
    return (
      <EditSpeed
        onCancel={() => setEditMode(false)}
        onSave={save}
        attributes={attributes}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewSpeed
        attributes={attributes}
      />
    </EditButton>
  );
}

Speed.propTypes = {
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Speed;
