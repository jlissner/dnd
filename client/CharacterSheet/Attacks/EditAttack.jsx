import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import AttackForm from './AttackForm';
import ViewAttack from './ViewAttack';

function EditAttack({
  attack,
  character,
  onCancel,
  onDelete,
  onSave,
}) {
  return (
    <EditContainer
      Form={AttackForm}
      Preview={({ newVal }) => <ViewAttack attack={newVal} character={character} />}
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
      value={attack}
    />
  );
}

EditAttack.propTypes = {
  attack: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAttack;
