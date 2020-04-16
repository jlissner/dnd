import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
} from '@material-ui/core';
import { Fa } from '../utils';

const useStyles = makeStyles((theme) => ({
  button: {
    height: '100%',
  },
}));

function AddButton({
  BoxProps,
  onAdd,
  ...props
}) {
  const classes = useStyles();

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
      <Button className={classes.button} fullWidth onClick={onAdd} {...props}>
        <Fa icon="plus" size="lg" />
      </Button>
    </Box>
  )
}

AddButton.propTypes = {
  BoxProps: PropTypes.shape(),
  onAdd: PropTypes.func.isRequired,
};

AddButton.defaultProps = {
  BoxProps: {},
};

export default AddButton;
