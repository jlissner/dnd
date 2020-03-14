import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import ViewInitiative from './ViewInitiative';
import initiativeForm from './initiativeForm';

function EditInitiative({
  onCancel,
  onSave,
  character,
}) {
  return (
    <EditContainer
      bgcolor="background.paper"
      form={initiativeForm}
      Preview={({ newVal }) => <ViewInitiative character={{ ...character, initiative: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={character.initiative}
      width={320}
    />
  )
}

EditInitiative.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  character: PropTypes.shape().isRequired,
};

export default EditInitiative;
