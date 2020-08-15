import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../../../utils';

async function updateStat({ idPk, type, ...patch }) {
  const validPatchOptions = _pick(patch, ['title', 'notes']);
  const query = `
    mutation {
      updatedStat:updateStat(input: {
        idPk: "${idPk}",
        patch: {
          ${type ? `type: ${type},` : ''}
          ${objToGraphqlStr(validPatchOptions)}
        }
      }) {
        stat {
          idPk
          characterFk
          title
          smartValueFk
          type
          notes
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, updatedStat } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updatedStat.stat;
}

export default updateStat;
