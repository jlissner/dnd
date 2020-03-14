import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import ViewSpeed from './ViewSpeed';
import speedForm from './speedForm';

function EditSpeed({
  onCancel,
  onSave,
  character,
}) {
  return (
    <EditContainer
      bgcolor="background.paper"
      form={speedForm}
      Preview={({ newVal }) => <ViewSpeed character={{ ...character, speed: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={character.speed}
      width={320}
    />
  )
}

EditSpeed.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  character: PropTypes.shape().isRequired,
};

export default EditSpeed;
