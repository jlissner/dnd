import axios from 'axios';

async function deleteWidget({ idPk }) {
  const query = `
    mutation {
      deleteWidget(input: {idPk: "${idPk}"}) {
        clientMutationId
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });

  if (data.data.errors) {
    throw new Error(data.data.errors);
  }

  return idPk;
}

export default deleteWidget;
