import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

function AddButton({
  BoxProps,
  ...props
}) {
  return (
    <Box
      bgcolor="background.paper"
      border={1}
      borderRadius={4}
      borderColor="rgba(0, 0, 0, .42)"
      color="grey.500"
      mx="auto"
      width="25%"
      {...BoxProps}
    >
      <Button fullWidth {...props}>
        <AddIcon />
      </Button>
    </Box>
  )
}

AddButton.propTypes = {
  BoxProps: PropTypes.shape(),
};

AddButton.defaultProps = {
  BoxProps: {},
};

export default AddButton;
