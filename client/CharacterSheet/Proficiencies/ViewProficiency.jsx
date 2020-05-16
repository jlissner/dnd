import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import Radio from '../../Form/Radio';
import { getNumericPrefix, getTotalModifier } from '../../utils';
import { useNotes } from '../../hooks';

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
        <Radio
          checked={proficient}
          disabled={saving}
          onClick={handleClick}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          component={Typography}
          width={1}
        >
          <strong>
            {getNumericPrefix(modifier) + modifier}
          </strong>
        </Box>
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
