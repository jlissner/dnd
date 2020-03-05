import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditAttribute from './EditAttribute';
import ViewAttribute from './ViewAttribute';

function Attribute({
  attribute,
  character,
  onSave,
}) {
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <EditAttribute
        attribute={attribute}
        character={character}
        onSave={onSave}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewAttribute attribute={attribute} character={character} />
    </EditButton>
  );
}

Attribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Attribute;
