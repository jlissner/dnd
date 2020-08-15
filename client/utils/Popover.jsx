import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover as MuiPopover,
} from '@material-ui/core';

function Popover({
  children,
  element,
  handleClose,
}) {
  return (
    <MuiPopover
      anchorEl={element}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(element)}
      onClose={handleClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {children}
    </MuiPopover>
  )
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.instanceOf(Element).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Popover;
