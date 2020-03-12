import React from 'react';
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';
import EditContainer from '../../Form/EditContainer';
import ViewProficiency from './ViewProficiency';
import proficiencyForm from './proficiencyForm';

function EditProficiency({
  character,
  onCancel,
  onDelete,
  onSave,
  proficiency,
}) {
  return (
    <EditContainer
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
      Preview={({ newVal }) => (
        <ViewProficiency
          character={character}
          proficiency={newVal}
        />
      )}
      form={proficiencyForm}
      value={proficiency}
    />
  )
}

EditProficiency.propTypes = {
  character: PropTypes.shape().isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  proficiency: PropTypes.shape().isRequired,
};

EditProficiency.propTypes = {
  onDelete: _noop,
};

export default EditProficiency;
