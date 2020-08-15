import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditAttribute from './EditAttribute';
import ViewAttribute from './ViewAttribute';

function Attribute({
  attribute,
  attributes,
  onSave,
}) {
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <EditAttribute
        attribute={attribute}
        attributes={attributes}
        onSave={onSave}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewAttribute attribute={attribute} attributes={attributes} />
    </EditButton>
  );
}

Attribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Attribute;
