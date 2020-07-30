import axios from 'axios';
import _reduce from 'lodash/reduce';

async function reorderListItems(listId, items) {
  if (items.length === 0) {
    return;
  }

  const updates = _reduce(items, (res, { idPk, listOrder }) => (
    `${res}
      update${idPk}:updateListItem(input: {
          idPk: "${idPk}",
          patch: {
            listOrder: ${listOrder}
          }
        }) {
          clientMutationId
        }
    `
  ), '');
  const query = `mutation { ${updates} }`;

  await axios.post('/query/graphql', { query });

  const fetchQuery = `
    query {
      list(idPk: "${listId}") {
        idPk
        title
        type
        showTitle
        listItems {
          nodes {
            idPk
            text
            checked
            listOrder
          }
        }
      }
    }
  `;
  const fetchRes = await axios.post('/query/graphql', { query: fetchQuery });
  const { list } = fetchRes.data.data;

  list.listItems = list.listItems.nodes;

  return list;
}

export default reorderListItems;
