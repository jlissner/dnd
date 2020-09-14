import React from 'react';
import PropTypes from 'prop-types';

function WidgetSmartValues({ value }) {
  return (
    <div>
      {value}
    </div>
  );
}

WidgetSmartValues.propTypes = {
  value: PropTypes.string.isRequired,
};

export default WidgetSmartValues;
