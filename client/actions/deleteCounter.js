import axios from 'axios';

async function deleteCounter(counterId) {
  const query = `
    mutation {
      deleteCounter(input: {idPk: "${counterId}"}) {
        clientMutationId
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });

  if (res.data.data.errors) {
    throw new Error(res.data.errors);
  }

  return counterId;
}

export default deleteCounter;
