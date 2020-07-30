import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../utils';

async function updateList({ idPk, type, ...patch }) {
  const validPatchOptions = _pick(patch, ['title', 'type', 'showTitle']);
  const query = `
    mutation {
      updateList(input: {
        idPk: "${idPk}",
        patch: {
          type: ${type},
          ${objToGraphqlStr(validPatchOptions)}
        }
      }) {
        list {
          idPk
          title
          type
          showTitle
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const updatedList = data.data.updateList.list;

  return updatedList;
}

export default updateList;
