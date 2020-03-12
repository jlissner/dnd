import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import attributeForm from './attributeForm';
import ViewAttribute from './ViewAttribute';

function EditAttribute({
  attribute,
  character,
  onCancel,
  onSave,
}) {
  return (
    <EditContainer
      onCancel={onCancel}
      onSave={onSave}
      form={attributeForm}
      Preview={({ newVal }) => <ViewAttribute attribute={newVal} character={character} />}
      value={attribute}
    />
  )
}

EditAttribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAttribute;
