import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
  Typography,
} from '@material-ui/core';
import getNumericPrefix from '../utils/getNumericPrefix';
import NumericInput from './NumericInput';

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
        <NumericInput
          border={0}
          p={2}
          width={1}
          value={value}
        />
      </Box>
      <NumericInput
        className={classes.modifier}
        bgcolor="grey.200"
        borderRadius="50%"
        bottom={0}
        component={ReactNumberFormat}
        left={0}
        right={0}
        mx="auto"
        position="absolute"
        prefix={getNumericPrefix(modifier)}
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
