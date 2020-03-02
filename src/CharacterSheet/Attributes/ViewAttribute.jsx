import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
} from '@material-ui/core';
import getNumericPrefix from '../../utils/getNumericPrefix';
import getTotalModifier from '../../utils/getTotalModifier';
import useNotes from '../../hooks/useNotes';
import NumericInput from '../../Form/NumericInput';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '4px 4px 0 0',
  },
  modifier: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

function ViewAttribute({
  attribute,
  character,
}) {
  const {
    abbv,
    bonusModifier,
    name,
    notes,
    value,
  } = attribute;
  const modifier = getTotalModifier(character, abbv, false, bonusModifier);
  const [ref, openNotes, notesComponent] = useNotes(notes);
  const classes = useStyles();
  const renderedName = notes ? `${name}*` : name;

  return (
    <Box position="relative" pb={3}>
      <Box
        bgcolor="white"
        border={1}
        borderColor="grey.500"
        borderRadius={4}
        className={classes.wrapper}
        ref={ref}
      >
        <Button
          className={classes.button}
          color="primary"
          fullWidth
          onClick={openNotes}
          variant="contained"
        >
          {renderedName}
        </Button>
        <NumericInput
          border={0}
          p={2}
          width={1}
          value={value}
        />
        <Box bgcolor="primary.main" p={1} />
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
      {notesComponent}
    </Box>
  );
}

ViewAttribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default ViewAttribute;
