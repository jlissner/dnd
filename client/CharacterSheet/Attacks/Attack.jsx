import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditAttack from './EditAttack';
import ViewAttack from './ViewAttack';

function Attack({
  attack,
  attributes,
  onDelete,
  onSave,
}) {
  const { name } = attack;
  const [editMode, setEditMode] = useState(!name);

  if (editMode) {
    return (
      <EditAttack
        attack={attack}
        attributes={attributes}
        onCancel={() => setEditMode(false)}
        onDelete={onDelete}
        onSave={onSave}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewAttack attack={attack} attributes={attributes} onSave={onSave} />
    </EditButton>
  )
}

Attack.propTypes = {
  attack: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Attack;
