import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Confirm, Fa } from '../utils';

function DeleteButton({
  onClick,
}) {
  return (
    <Confirm
      Component={(props) => (<Button {...props}><Fa icon="times" /></Button>)}
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
