import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditArmorClass from './EditArmorClass';
import ViewArmorClass from './ViewArmorClass';

function ArmorClass({
  character,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(ac) {
    updateCharacter({ ac })
  }

  if (editMode) {
    return (
      <EditArmorClass
        onCancel={() => setEditMode(false)}
        onSave={save}
        character={character}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewArmorClass
        character={character}
      />
    </EditButton>
  );
}

ArmorClass.propTypes = {
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default ArmorClass;