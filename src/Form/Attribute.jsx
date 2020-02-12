import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
  Typography,
} from '@material-ui/core';
import ReactNumberFormat from 'react-number-format';

// const useStyles = makeStyles((theme) => ({
//   modifier: {
//     width: '50%',
//     borderRadius: '100%',
//   },
// }));

function Attribute({
  name,
  modifier,
  notes,
  value,
}) {
  return (
    <Box position="relative">
      <Box border={1} borderColor="grey.500" borderRadius={4} pb={2}>
        <Typography align="center">{name}</Typography>
        <TextField
          value={value}
          variant="filled"
          fullWidth
        />
      </Box>
      <Box
        bgcolor="paper"
        border={1}
        borderColor="grey.500"
        borderRadius="50%"
        bottom={-20}
        component={ReactNumberFormat}
        display="block"
        left={0}
        right={0}
        mx="auto"
        position="absolute"
        prefix={modifier > -1 ? '+' : ''}
        textAlign="center"
        value={modifier}
        variant="filled"
        height="40px"
        width="40px"
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
