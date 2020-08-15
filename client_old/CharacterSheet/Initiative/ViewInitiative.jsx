import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@material-ui/core';
import _reduce from 'lodash/reduce';
import { Simple } from '../../Displays';
import getTotalModifier from '../../utils/getTotalModifier';
import getNumericPrefix from '../../utils/getNumericPrefix';

function calculateInitiative({ initiative, ...attributes }) {
  const { modifiers } = initiative;
  const attrModifier = getTotalModifier(attributes, 'dex');
  const bonusModifiers = _reduce(modifiers, (res, { active, value }) => (active ? res + value : res), 0)

  return attrModifier + bonusModifiers;
}

function ViewInitiative({
  attributes,
}) {
  const { initiative } = attributes;
  const { notes } = initiative;
  const totalInitiative = calculateInitiative(attributes);

  return (
    <Simple label="Initiative" notes={notes}>
      <Box p={1} textAlign="center" component={Typography}>
        {getNumericPrefix(totalInitiative)}
        {totalInitiative}
      </Box>
    </Simple>
  )
}

ViewInitiative.propTypes = {
  attributes: PropTypes.shape().isRequired,
};

export default ViewInitiative;
