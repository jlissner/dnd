import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modifier: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  name: {
    textTransform: 'uppercase',
  },
}));

function Attribute({
  name,
  modifier,
  notes,
  value,
}) {
  const classes = useStyles();

  return (
    <Box position="relative" pb={3}>
      <Box border={1} borderColor="grey.500" borderRadius={4} pb={2} bgcolor="white">
        <Typography align="center" className={classes.name}>{name}</Typography>
        <Box
          bgcolor="grey.200"
          border={0}
          component={ReactNumberFormat}
          display="block"
          p={2}
          textAlign="center"
          width={1}
          value={value}
        />
      </Box>
      <Box
        className={classes.modifier}
        bgcolor="grey.200"
        border={1}
        borderColor="grey.500"
        borderRadius="50%"
        bottom={0}
        component={ReactNumberFormat}
        display="block"
        left={0}
        right={0}
        mx="auto"
        position="absolute"
        prefix={modifier > -1 ? '+' : ''}
        textAlign="center"
        value={modifier}
      />
    </Box>
  );
}

Attribute.propTypes = {
  name: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Attribute;
