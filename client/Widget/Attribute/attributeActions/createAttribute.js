import axios from 'axios';
import { createSmartValue, createSmartValueModifier } from '../../../actions';

async function createAttribute({ name, value, abbr }, characterId) {
  const attributePromise = createSmartValue({ name, value });
  const attrModifierPromise = createSmartValue({ name: `${name} Modifier`, value: '0' });
  const [attribute, attrModifier] = await Promise.all([attributePromise, attrModifierPromise]);
  const modifierPromise = createSmartValueModifier({
    smartValueFk: attrModifier.idPk,
    type: 'ATTR_MOD',
    smartValueRefFk: attribute.idPk,
    active: true,
    listOrder: '1',
  });
  const query = `
    mutation {
      createCharacterAttribute(input: {
        characterAttribute: {
          characterFk: "${characterId}",
          attributeFk: "${attribute.idPk}",
          attributeModifierFk: "${attrModifier.idPk}",
          name: "${name}"
          abbr: "${abbr}"
        }
      }) {
        characterAttribute {
          characterFk
          attributeFk
          attributeModifierFk
          name
          abbr
          notes
        }
      }
    }
  `;
  const characterAttributePromise = axios.post('/query/graphql', { query });
  const [characterAttributeRes] = await Promise.all([characterAttributePromise, modifierPromise]);
  const { errors } = characterAttributeRes.data.data;

  if (errors) {
    throw new Error(errors);
  }

  return attribute;
}

export default createAttribute;
