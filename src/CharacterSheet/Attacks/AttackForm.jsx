import React from 'react';
import PropTypes from 'prop-types';

function AttackForm({
  newVal,
  setNewVal,
}) {
  return (
    <div>
      Hello Form
    </div>
  )
}

AttackForm.propTypes = {
  newVal: PropTypes.shape().isRequired,
  setNewVal: PropTypes.func.isRequired,
};

export default AttackForm;
