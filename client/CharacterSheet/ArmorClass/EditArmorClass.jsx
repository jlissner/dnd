import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import ViewArmorClass from './ViewArmorClass';
import armorClassForm from './armorClassForm';

function EditArmorClass({
  onCancel,
  onSave,
  attributes,
}) {
  return (
    <EditContainer
      bgcolor="background.paper"
      form={armorClassForm}
      Preview={({ newVal }) => <ViewArmorClass attributes={{ ...attributes, ac: newVal }} />}
      onCancel={onCancel}
      onSave={onSave}
      value={attributes.ac}
      width={320}
    />
  )
}

EditArmorClass.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  attributes: PropTypes.shape().isRequired,
};

export default EditArmorClass;
