import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import _noop from 'lodash/noop';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: ({ onClick }) => (onClick === _noop ? 'default' : 'pointer'),
    fontSize: '0.8rem',
    transition: '0.2s all ease-in-out',

    '&:hover': {
      backgroundColor: ({ onClick }) => (
        onClick === _noop
          ? theme.palette.primary.main
          : theme.palette.primary.light
        ),
    },

    '& + $root': {
      marginLeft: theme.spacing(0.5),
    },
  },
}));

function Badge(props) {
  const {
    onClick,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <Box
      bgcolor="primary.main"
      border={1}
      borderColor="primary.dark"
      borderRadius={4}
      display="inline-block"
      className={classes.root}
      component={Typography}
      color="primary.contrastText"
      p={0.5}
      {...rest}
    >
      {text}
    </Box>
  )
}

Badge.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Badge.defaultProps = {
  onClick: _noop,
}

export default Badge;
