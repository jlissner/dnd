import React from 'react';
import PropTypes from 'prop-types';

function EditArmorClass({
  onCancel,
  onSave,
  character,
}) {
  return (
    <div>
      Hello World
    </div>
  )
}

EditArmorClass.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  character: PropTypes.shape().isRequired,
};

export default EditArmorClass;
