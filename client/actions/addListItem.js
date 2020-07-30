import axios from 'axios';

async function addListItem(idPk, listOrder) {
  const query = `
    mutation {
      createListItem(input: {listItem: {
        listFk: "${idPk}",
        text: "",
        checked: false,
        listOrder: ${listOrder}
      }}) {
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
  const { listItem } = res.data.data.createListItem;

  return listItem;
}

export default addListItem;
