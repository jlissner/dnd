import _find from 'lodash/find';
import { modifiers } from './constants';

function getTotalModifier(character, type, proficient = false, bonusModifier = 0) {
  const { attributes, proficiencyBonus } = character;
  const parsedBonus = bonusModifier ? parseInt(bonusModifier, 10) : 0;
  const bonuses = proficient
   ? (proficiencyBonus + parsedBonus)
   : parsedBonus;

  try {
    const { value, bonusModifier: attrBonusModifier } =  _find(attributes, { abbv: type });
    const attrModifier = modifiers[value];
    const parsedAttrBonusModifier = attrBonusModifier ? parseInt(attrBonusModifier, 10) : 0;

    return attrModifier + bonuses + parsedAttrBonusModifier;
  } catch (err) {
    console.error(`${type} is not a valid attribute`);

    return null;
  }
}

export default getTotalModifier;
