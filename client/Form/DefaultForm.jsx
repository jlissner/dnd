import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
} from '@material-ui/core';

function DefaultForm({
  children,
  handleSave,
}) {
  return (
    <Box>
      <Box p={2} >{children}</Box>
      <Divider />
      <Box p={2} textAlign="right">
        <Button
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

DefaultForm.propTypes = {
  children: PropTypes.node.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default DefaultForm;
