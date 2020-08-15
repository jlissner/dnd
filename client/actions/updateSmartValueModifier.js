import axios from 'axios';
import { objToGraphqlStr } from '../utils';

async function updateSmartValueModifier({ idPk, ...patch }) {
  const query = `
    mutation {
      updateSmartValueModifier(input: {
        idPk: "${idPk}",
        patch: {
          ${objToGraphqlStr(patch)}
        }
      }) {
        clientMutationId
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, updateSmartValueModifier } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updateSmartValueModifier.clientMutationId;
}

export default updateSmartValueModifier;