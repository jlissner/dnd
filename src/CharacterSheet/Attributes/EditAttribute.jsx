import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import ViewAttribute from './ViewAttribute';

function EditAttribute({
  attribute,
  character,
  onSave,
}) {
  return (
    <EditContainer
      onSave={onSave}
      Form={() => 'editing!'}
      Preview={({ newVal }) => <ViewAttribute attribute={newVal} character={character} />}
      value={attribute}
    />
  )
}

EditAttribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAttribute;
