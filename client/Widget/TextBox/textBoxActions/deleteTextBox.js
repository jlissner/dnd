import axios from 'axios';

async function deleteTextBox({ idPk }) {
  const query = `
    mutation {
      deleteTextBox(input: {idPk: "${idPk}"}) {
        clientMutationId
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });

  if (res.data.data.errors) {
    throw new Error(res.data.errors);
  }

  return idPk;
}

export default deleteTextBox;
