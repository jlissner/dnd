import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../Editor';
import ViewInitiative from './ViewInitiative';
import initiativeForm from './initiativeForm';

function EditInitiative({
  onCancel,
  onSave,
  attributes,
}) {
  return (
    <Editor
      bgcolor="background.paper"
      form={initiativeForm}
      Preview={({ newVal }) => <ViewInitiative attributes={{ ...attributes, initiative: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={attributes.initiative}
      width={320}
    />
  )
}

EditInitiative.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  attributes: PropTypes.shape().isRequired,
};

export default EditInitiative;
