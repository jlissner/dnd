import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@material-ui/core';
import _reduce from 'lodash/reduce';
import { Simple } from '../../Displays';
import getTotalModifier from '../../utils/getTotalModifier';

function calculateAc({ ac, ...character }) {
  const { base, attributes, maxAttrMod, modifiers } = ac;
  const attrModifiers = _reduce(attributes, (res, attr) => res + getTotalModifier(character, attr), 0);
  const bonusModifiers = _reduce(modifiers, (res, { active, value }) => (active ? res + value : res), 0)
  const attrMod = (maxAttrMod > -1 && attrModifiers > maxAttrMod)
    ? maxAttrMod
    : attrModifiers;

  return base + attrMod + bonusModifiers;
}

function ViewArmorClass({
  character,
}) {
  const { ac } = character;
  const { notes } = ac;
  const totalAc = calculateAc(character);
  
  return (
    <Simple label="AC" notes={notes}>
      <Box p={1} textAlign="center" component={Typography}>
        {totalAc}
      </Box>
    </Simple>
  )
}

ViewArmorClass.propTypes = {
  character: PropTypes.shape().isRequired,
};

export default ViewArmorClass;
