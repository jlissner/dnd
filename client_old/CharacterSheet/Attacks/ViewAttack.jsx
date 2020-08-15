import React from 'react';
import PropTypes from 'prop-types';
import _toUpper from 'lodash/toUpper';
import getNumericPrefix from '../../utils/getNumericPrefix';
import getTotalModifier from '../../utils/getTotalModifier';
import ViewAdvancedTextSection from '../AdvancedTextSection/ViewAdvancedTextSection';

const BASE_SAVE_DC = 8;

function getSave(attributes, type) {
  const  [attr, save] = type.split(':');
  const dc = getTotalModifier(attributes, attr, true, BASE_SAVE_DC);

  return `${_toUpper(save)}${dc}`
}

function getHit(atk, attributes) {
  const { modType, bonusModifier, proficient, isSpell } = atk;
  const isSave = modType.indexOf(':') > -1;

  if (!isSave) {
    const addProficiencyBonus = isSpell || proficient;
    const modifier = getTotalModifier(attributes, modType, addProficiencyBonus, bonusModifier);

    return `${getNumericPrefix(modifier)}${modifier}`;
  }

  return getSave(attributes, modType);
}

function getDamage(dmg, modifier) {
  const prefix = modifier ? `${getNumericPrefix(modifier)}${modifier}` : '';

  return dmg + prefix
}

function ViewAttack({
  attack,
  attributes,
  onSave,
}) {
  const {
    dmg,
    dmgType,
    name,
    uses,
    range,
    notes,
    bonusModifier,
    isSpell,
    modType,
  } = attack;
  const atkRange = range ? `range: ${range} | ` : '';
  const hit = getHit(attack, attributes);
  const bonusDmg = isSpell ? bonusModifier : getTotalModifier(attributes, modType, false, bonusModifier);
  const damage = getDamage(dmg, bonusDmg);

  function save({ uses: newUses }) {
    onSave({
      ...attack,
      uses: newUses,
    })
  }

  return (
    <ViewAdvancedTextSection
      onSave={save}
      tags={[]}
      name={name}
      longDesc={notes}
      shortDesc={`${atkRange}hit: ${hit} | dmg: ${damage} | type: ${dmgType}`}
      uses={uses}
    />
  )
}

ViewAttack.propTypes = {
  attack: PropTypes.shape().isRequired,
  attributes: PropTypes.shape().isRequired,
};

export default ViewAttack;
