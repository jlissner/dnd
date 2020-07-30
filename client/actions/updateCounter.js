import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../utils';

async function updateCounter({ idPk, ...patch }) {
  const validPatchOptions = _pick(patch, ['title', 'value']);
  const query = `
    mutation {
      updateCounter(input: {
        idPk: "${idPk}",
        patch: {
          ${objToGraphqlStr(validPatchOptions)}
        }
      }) {
        counter {
          idPk
          userFk
          title
          value
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const updatedCounter = data.data.updateCounter.counter;

  return updatedCounter;
}

export default updateCounter;
