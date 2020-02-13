import React from 'react';
import PropTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 0,
  },
}));

function Proficiency({
  name,
  modifier,
  proficiencyBonus,
  proficient,
}) {
  const classes = useStyles();
  const value = modifier + (proficient ? proficiencyBonus : 0);

  return (
    <Grid container spacing={1} wrap="nowrap" alignItems="center">
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
          bgcolor="grey.200"
          border={1}
          borderRadius={4}
          component={ReactNumberFormat}
          p={.5}
          px={.75}
          prefix={modifier > -1 ? '+' : ''}
          value={value}
          width={1}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>{name}</Typography>
      </Grid>
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
