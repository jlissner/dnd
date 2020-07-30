import axios from 'axios';

async function removeListItem(listItemId) {
  const query = `
    mutation {
      deleteListItem(input: {idPk: "${listItemId}"}) {
        clientMutationId
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });
  
  if (res.data.data.errors) {
    throw res.data.data.errors;
  }

  return listItemId;
}

export default removeListItem;
