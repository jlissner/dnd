import _find from 'lodash/find';
import { modifiers } from './constants';

function getTotalModifier(character, type, proficient = false, bonusModifier = 0) {
  const { attributes, proficiencyBonus } = character;
  const bonuses = proficient
   ? (proficiencyBonus + bonusModifier)
   : bonusModifier;

  try {
    const { value } =  _find(attributes, { abbv: type });
    const attrModifier = modifiers[value];

    return attrModifier + bonuses;
  } catch (err) {
    console.error(`${type} is not a valid attribute`);

    return null;
  }
}

export default getTotalModifier;
