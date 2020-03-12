import React from 'react';
import PropTypes from 'prop-types';
import _toUpper from 'lodash/toUpper';
import getNumericPrefix from '../../utils/getNumericPrefix';
import getTotalModifier from '../../utils/getTotalModifier';
import ViewAdvancedTextSection from '../AdvancedTextSection/ViewAdvancedTextSection';

const BASE_SAVE_DC = 8;

function getSave(character, type) {
  const  [attr, save] = type.split(':');
  const dc = getTotalModifier(character, attr, true, BASE_SAVE_DC);

  return `${_toUpper(save)}${dc}`
}

function getHit(atk, character) {
  const { modType, bonusModifier, proficient } = atk;
  const isSave = modType.indexOf(':') > -1;

  if (!isSave) {
    const modifier = getTotalModifier(character, modType, proficient, bonusModifier);

    return `${getNumericPrefix(modifier)}${modifier}`;
  }

  return getSave(character, modType);
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
    bonusModifier,
  } = attack;
  const atkName = getName(name, bonusModifier);
  const atkRange = range ? `range: ${range} | ` : '';
  const hit = getHit(attack, character);
  const damage = getDamage(dmg, bonusModifier);

  return (
    <ViewAdvancedTextSection
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
