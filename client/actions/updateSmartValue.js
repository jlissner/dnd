import axios from 'axios';
import { objToGraphqlStr } from '../utils';

async function updateSmartValue({ idPk, ...patch }) {
  const query = `
    mutation {
      updateSmartValue(input: {
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
  const { errors, updateSmartValue } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updateSmartValue.clientMutationId;
}

export default updateSmartValue;