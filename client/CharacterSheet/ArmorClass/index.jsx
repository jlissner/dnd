import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditArmorClass from './EditArmorClass';
import ViewArmorClass from './ViewArmorClass';

function ArmorClass({
  attributes,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(ac) {
    updateCharacter({ attributes: { ac } })
  }

  if (editMode) {
    return (
      <EditArmorClass
        onCancel={() => setEditMode(false)}
        onSave={save}
        attributes={attributes}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewArmorClass
        attributes={attributes}
      />
    </EditButton>
  );
}

ArmorClass.propTypes = {
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default ArmorClass;
