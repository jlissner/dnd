import React, { useEffect, useState } from 'react';
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

function ViewProficiency({
  proficiency,
  onSave,
  attributes,
}) {
  const {
    bonusModifier,
    name,
    notes,
    proficient,
    type,
  } = proficiency;
  const modifier = getTotalModifier(attributes, type, proficient, bonusModifier);
  const classes = useStyles();
  const [saving, setSaving] = useState(false);
  const [ref, openNotes, notesComponent] = useNotes(notes);
  const displayName = notes
    ? `${name}*`
    : name;

    useEffect(() => {
      setSaving(false);
    }, [proficient]);

  function handleClick() {
    setSaving(true);
    onSave({ ...proficiency, proficient: !proficient });
  }

  return (
    <Grid container spacing={1} wrap="nowrap" alignItems="center" ref={ref}>
      <Grid item>
        <Checkbox
          checkedIcon={<RadioButtonChecked />}
          checked={proficient}
          className={classes.checkbox}
          disabled={saving}
          icon={<RadioButtonUnchecked />}
          onClick={handleClick}
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

ViewProficiency.propTypes = {
  attributes: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
  proficiency: PropTypes.shape().isRequired,
};

export default ViewProficiency;
