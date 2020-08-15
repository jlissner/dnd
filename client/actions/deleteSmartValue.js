import axios from 'axios';

async function deleteSmartValue(smartValueId) {
  const query = `
    mutation {
      deleteSmartValue(input: {idPk: "${smartValueId}"}) {
        clientMutationId
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });

  if (data.data.errors) {
    throw new Error(data.data.errors);
  }

  return smartValueId;
}

export default deleteSmartValue;
