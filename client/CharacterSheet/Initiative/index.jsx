import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditInitiative from './EditInitiative';
import ViewInitiative from './ViewInitiative';

function Initiative({
  attributes,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(initiative) {
    updateCharacter({ attributes: { initiative } });
  }

  if (editMode) {
    return (
      <EditInitiative
        onCancel={() => setEditMode(false)}
        onSave={save}
        attributes={attributes}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewInitiative
        attributes={attributes}
      />
    </EditButton>
  );
}

Initiative.propTypes = {
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Initiative;
