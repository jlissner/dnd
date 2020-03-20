import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import getNumericPrefix from '../../utils/getNumericPrefix';
import getTotalModifier from '../../utils/getTotalModifier';
import useNotes from '../../hooks/useNotes';

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
    name,
    notes,
    value,
  } = attribute;
  const attrIndex = _findIndex(character.attributes, { name });
  const charWithUpdatedAttribute = _cloneDeep(character);

  charWithUpdatedAttribute.attributes[attrIndex] = attribute;

  const modifier = getTotalModifier(charWithUpdatedAttribute, abbv);
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
        <Box
          p={2}
          width={1}
          bgcolor="grey.200"
        >
          <Typography align="center">{value}</Typography>
        </Box>
        <Box bgcolor="primary.main" p={1} />
      </Box>
      <Box
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        display="flex"
        p={.5}
        justifyContent="center"
        alignItems="center"
        className={classes.modifier}
        bgcolor="grey.200"
        borderRadius="50%"
        bottom={0}
        left={0}
        right={0}
        mx="auto"
        position="absolute"
        textAlign="center"
      >
        <Typography align="center">{`${getNumericPrefix(modifier)}${modifier}`}</Typography>
      </Box>
      {notesComponent}
    </Box>
  );
}

ViewAttribute.propTypes = {
  attribute: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default ViewAttribute;
