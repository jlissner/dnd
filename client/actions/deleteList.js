import axios from 'axios';

async function deleteList(listId) {
  const query = `
    mutation {
      deleteList(input: {idPk: "${listId}"}) {
        clientMutationId
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });

  if (res.data.data.errors) {
    throw new Error(res.data.errors);
  }

  return listId;
}

export default deleteList;
