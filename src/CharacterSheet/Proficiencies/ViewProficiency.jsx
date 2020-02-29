import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Checkbox,
  Grid,
  Button,
} from '@material-ui/core';
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@material-ui/icons';
import getNumericPrefix from '../../utils/getNumericPrefix';
import useNotes from '../../hooks/useNotes';
import getTotalModifier from '../../utils/getTotalModifier';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 0,
  },
}));

function Proficiency({
  proficiency,
  character,
}) {
  const {
    bonusModifier,
    name,
    notes,
    proficient,
    type,
  } = proficiency;
  const modifier = getTotalModifier(character, type, proficient, bonusModifier);
  const classes = useStyles();
  const [ref, openNotes, notesComponent] = useNotes(notes);
  const displayName = notes
    ? `${name}*`
    : name;

  return (
    <Grid container spacing={1} wrap="nowrap" alignItems="center" ref={ref}>
      <Grid item>
        <Checkbox
          className={classes.checkbox}
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />}
          checked={proficient}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          bgcolor="rgba(0, 0, 0, 0.09)"
          border={1}
          borderRadius={4}
          component={ReactNumberFormat}
          p={.5}
          px={.75}
          prefix={getNumericPrefix(modifier)}
          value={modifier}
          width={1}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={openNotes} size="small">{displayName}</Button>
      </Grid>
      {notesComponent}
    </Grid>
  )
}

Proficiency.propTypes = {
  name: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  proficiencyBonus: PropTypes.number.isRequired,
  proficient: PropTypes.bool.isRequired,
};

export default Proficiency;
