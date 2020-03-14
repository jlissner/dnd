import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import ViewArmorClass from './ViewArmorClass';
import armorClassForm from './armorClassForm';

function EditArmorClass({
  onCancel,
  onSave,
  character,
}) {
  return (
    <EditContainer
      bgcolor="background.paper"
      form={armorClassForm}
      Preview={({ newVal }) => <ViewArmorClass character={{ ...character, ac: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={character.ac}
      width={320}
    />
  )
}

EditArmorClass.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  character: PropTypes.shape().isRequired,
};

export default EditArmorClass;
