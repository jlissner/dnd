import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import attackForm from './attackForm';
import ViewAttack from './ViewAttack';

function EditAttack({
  attack,
  attributes,
  onCancel,
  onDelete,
  onSave,
}) {
  return (
    <EditContainer
      form={attackForm}
      Preview={({ newVal }) => <ViewAttack attack={newVal} attributes={attributes} />}
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
      value={attack}
    />
  );
}

EditAttack.propTypes = {
  attack: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAttack;
