import axios from 'axios';

async function fetchList(idPk) {
  const query = `
    query {
      list(idPk: "${idPk}") {
        idPk
        userFk
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
  const res = await axios.post('/query/graphql', { query });
  const { list } = res.data.data;

  if (list) {
    list.listItems = list.listItems.nodes;
  }

  return list;
}

export default fetchList;
