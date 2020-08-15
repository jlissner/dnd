import axios from 'axios';
import { objToGraphqlStr } from '../utils';

async function createSmartValueModifier({ type, ...newSmartValueMod }) {
  const query = `
    mutation {
      createSmartValueModifier(input: {
        smartValueModifier: {
          type: ATTR_MOD
          ${objToGraphqlStr(newSmartValueMod)}
        }
      }) {
        smartValueModifier {
          idPk
          smartValueFk
          type
          smartValueRefFk
          active
          min
          max
          listOrder
        }
      }
    }
  `

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, createSmartValueModifier } = data.data;

  if (errors) {
    throw errors;
  }

  return createSmartValueModifier.smartValueModifier;
}

export default createSmartValueModifier;
