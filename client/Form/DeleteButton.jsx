import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Confirm from '../utils/Confirm';

function DeleteButton({
  onClick,
}) {
  return (
    <Confirm
      Component={(props) => (<Button {...props}><DeleteIcon /></Button>)}
      onConfirm={onClick}
      text="Once deleted, it cannot be undone."
      title="Delete this?"
    />
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
