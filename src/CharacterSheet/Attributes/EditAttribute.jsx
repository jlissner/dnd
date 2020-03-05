import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import AttributeForm from './AttributeForm';
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
      Form={AttributeForm}
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
