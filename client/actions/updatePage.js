import axios from 'axios';

async function updatePage({ idPk, title }) {
  const query = `
    mutation {
      updateCharacterPage(input: {
        idPk: "${idPk}",
        patch: {
          title: "${title}"
        }
      }) {
        clientMutationId
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, updateCharacterPage } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updateCharacterPage.clientMutationId;
}

export default updatePage;