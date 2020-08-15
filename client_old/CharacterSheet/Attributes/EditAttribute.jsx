import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../Editor';
import attributeForm from './attributeForm';
import ViewAttribute from './ViewAttribute';

function EditAttribute({
  attribute,
  attributes,
  onCancel,
  onSave,
}) {
  return (
    <Editor
      onCancel={onCancel}
      onSave={onSave}
      form={attributeForm}
      Preview={({ newVal }) => <ViewAttribute attribute={newVal} attributes={attributes} />}
      value={attribute}
    />
  )
}

EditAttribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAttribute;
