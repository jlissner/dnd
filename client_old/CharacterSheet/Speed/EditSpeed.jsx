import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../Editor';
import ViewSpeed from './ViewSpeed';
import speedForm from './speedForm';

function EditSpeed({
  onCancel,
  onSave,
  attributes,
}) {
  return (
    <Editor
      bgcolor="background.paper"
      form={speedForm}
      Preview={({ newVal }) => <ViewSpeed attributes={{ ...attributes, speed: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={attributes.speed}
      width={320}
    />
  )
}

EditSpeed.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  attributes: PropTypes.shape().isRequired,
};

export default EditSpeed;
