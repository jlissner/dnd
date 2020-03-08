import _find from 'lodash/find';
import _isNil from 'lodash/isNil';
import { modifiers } from './constants';

function getTotalModifier(character, type, proficient = false, bonusModifier = 0, overrideAttrModifier) {
  const { attributes, proficiencyBonus } = character;
  const bonuses = proficient
   ? (proficiencyBonus + bonusModifier)
   : bonusModifier;

  try {
    const { value } =  _find(attributes, { abbv: type });
    const attrModifier = _isNil(overrideAttrModifier) ? modifiers[value] : modifiers[overrideAttrModifier];

    return attrModifier + bonuses;
  } catch (err) {
    console.error(`${type} is not a valid attribute`);

    return null;
  }
}

export default getTotalModifier;
