import React from 'react';
import PropTypes from 'prop-types';

function FeatureComponent({id}) {
  return (
    <div>
      {id}
    </div>
  )
}

FeatureComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FeatureComponent;
