import React from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import _toUpper from 'lodash/toUpper';
import getNumericPrefix from '../../utils/getNumericPrefix';
import AdvancedTextSection from '../AdvancedTextSection';

const BASE_SAVE_DC = 8;

function getSave(type, attributes, proficiencyBonus) {
  const  [attr, save] = type.split(':');
  const { modifier } = _find(attributes, { abbv: attr });
  const dc = BASE_SAVE_DC + proficiencyBonus + modifier;

  return `${_toUpper(save)}${dc}`
}

function getHit(atk, character) {
  const { modType, modifier, proficient } = atk;
  const { attributes, proficiencyBonus } = character
  const attr = _find(attributes, { abbv: modType });

  if (attr) {
    const bonus = proficient ? proficiencyBonus : 0;
    const total = modifier + attr.modifier + bonus;

    return `${getNumericPrefix(total)}${total}`;
  }

  return getSave(modType, attributes, proficiencyBonus);
}

function getDamage(dmg, modifier) {
  const prefix = modifier ? `${getNumericPrefix(modifier)}${modifier}` : '';

  return dmg + prefix
}

function getName(name, modifier) {
  const prefix = modifier ? `${getNumericPrefix(modifier)}${modifier} ` : '';

  return prefix + name;
}

function ViewAttack({
  attack,
  character,
}) {
  const {
    dmg,
    dmgType,
    name,
    uses,
    range,
    notes,
    modifier,
  } = attack;
  const atkName = getName(name, modifier);
  const atkRange = range ? `range: ${range} | ` : '';
  const hit = getHit(attack, character);
  const damage = getDamage(dmg, modifier);

  return (
    <AdvancedTextSection
      onSave={() => alert('make me work')}
      tags={[]}
      name={atkName}
      longDesc={notes}
      shortDesc={`${atkRange}hit: ${hit} | dmg: ${damage} | type: ${dmgType}`}
      uses={uses}
    />
  )
}

ViewAttack.propTypes = {
  attack: PropTypes.shape().isRequired,
  character: PropTypes.shape().isRequired,
};

export default ViewAttack;
