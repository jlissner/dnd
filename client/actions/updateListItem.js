import axios from 'axios';
import { objToGraphqlStr } from '../utils';

async function updateListItem({ idPk, ...patch }) {
  const query = `
    mutation {
      updateListItem(input: {
        idPk: "${idPk}",
        patch: {${objToGraphqlStr(patch)}}
      }) {
        listItem {
          idPk
          text
          checked
          listOrder
        }
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });
  const { listItem } = res.data.data.updateListItem;

  return listItem;
}

export default updateListItem;
