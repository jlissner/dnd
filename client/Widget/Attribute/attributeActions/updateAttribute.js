import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../../../utils';

async function updateAttribute({ attributeFk, ...patch }) {
  const validPatch = _pick(patch, ['abbr', 'name', 'notes']);
  const query = `
    mutation {
      updateCharacterAttribute(input: {
        attributeFk: "${attributeFk}",
        patch: {
          ${objToGraphqlStr(validPatch)}
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
  const { data } = await axios.post('/query/graphql', { query });
  const { errors, updateCharacterAttribute } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updateCharacterAttribute.characterAttribute;
}

export default updateAttribute;
