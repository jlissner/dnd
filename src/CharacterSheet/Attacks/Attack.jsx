import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _toUpper from 'lodash/toUpper';
import getNumberPrefix from '../../utils/getNumericPrefix';

const BASE_SAVE_DC = 8;

function getSave(type, attributes, proficiencyBonus) {
  const  [attr, save] = type.split(':');
  const { modifier } = _find(attributes, { abbv: attr });
  const dc = BASE_SAVE_DC + proficiencyBonus + modifier;

  return `${_toUpper(save)}${dc}`
}

function getModifier(atk, character) {
  const { modType, modifier, proficient } = atk;
  const { attributes, proficiencyBonus } = character

  const something = _reduce(modType, (res, type) => {
    const attr = _find(attributes, { abbv: type });

    if (attr) {
      const bonus = proficient ? proficiencyBonus : 0;
      const total = modifier + attr.modifier + bonus;
      const mod = `${getNumberPrefix(total)}${total}`;

      return `${res}, ${mod}`;
    }

    const save = getSave(type, attributes, proficiencyBonus);

    return `${res}, ${save}`
  }, '');

  return something.substring(2);
}

function Attack({
  attack,
  character,
}) {
  const {
    dmg,
    dmgType,
    name,
    quantity,
  } = attack;

  return (
    <>
      <Grid item xs={4}>
        <Typography>{quantity > 1 ? `${quantity}x ` : ''}{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{getModifier(attack, character)}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{dmg instanceof Array ? dmg.reduce((r, d) => r ? `${r} | ${d}` : d) : dmg}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{dmgType}</Typography>
      </Grid>
    </>
  )
}

Attack.propTypes = {
  attack: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default Attack;
