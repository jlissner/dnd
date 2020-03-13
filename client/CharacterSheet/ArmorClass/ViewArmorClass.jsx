import React from 'react';
import PropTypes from 'prop-types';
import { Simple } from '../../Displays';

function ViewArmorClass({
  character,
}) {
  return (
    <Simple label="AC">
      +7
    </Simple>
  )
}

ViewArmorClass.propTypes = {
  character: PropTypes.shape().isRequired,
};

export default ViewArmorClass;
