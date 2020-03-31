import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';
import EditButton from '../../Form/EditButton';
import EditProficiency from './EditProficiency';
import ViewProficiency from './ViewProficiency';

function Proficiency({
  proficiency,
  attributes,
  onDelete,
  onSave,
}) {
  const { name } = proficiency;
  const [editMode, setEditMode] = useState(!name);

  if (editMode) {
    return (
      <EditProficiency
        proficiency={proficiency}
        attributes={attributes}
        onCancel={name ? () => setEditMode(false) : onDelete}
        onDelete={onDelete}
        onSave={onSave}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewProficiency proficiency={proficiency} attributes={attributes} onSave={onSave} />
    </EditButton>
  )
}

Proficiency.propTypes = {
  Proficiency: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
};

Proficiency.propTypes = {
  onDelete: _noop,
};

export default Proficiency;
