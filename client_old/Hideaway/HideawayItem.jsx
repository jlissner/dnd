import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
} from '@material-ui/core';

function HideawayItem({
  icon,
  children,
  title,
  show,
}) {
  return <Box>children</Box>;
}

HideawayItem.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

HideawayItem.defaultProps = {
  show: true,
};

export default HideawayItem;
