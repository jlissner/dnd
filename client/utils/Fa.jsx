import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Fa({
  ...props
}) {
  return (
    <FontAwesomeIcon {...props} />
  )
}

Fa.propTypes = {
  fixedWidth: PropTypes.bool,
};

Fa.defaultProps = {
  fixedWidth: true,
}

export default Fa;
