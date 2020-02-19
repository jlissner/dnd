import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _toUpper from 'lodash/toUpper';
import getNumberPrefix from '../../utils/getNumericPrefix';
import Radio from '../../Form/Radio';

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
    uses,
  } = attack;

  return (
    <Box mb={1}>
      <Box
      >
        <Typography variant="caption">{dmgType}</Typography>
      </Box>
      <Box component={Typography}>
        <strong>{quantity > 1 ? `${quantity}x ` : ''}{name}</strong>
        {' '}
        {getModifier(attack, character)}
        {' '}
        {dmg}
        {' '}
      </Box>
      <Box>
        {_map(uses, (use, i) => (
          <Radio key={i} checked={use} />
        ))}
      </Box>
    </Box>
  )
}

Attack.propTypes = {
  attack: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default Attack;
