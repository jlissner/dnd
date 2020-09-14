import axios from 'axios';

async function createPage({ title, characterId }) {
  const query = `
    mutation {
      createCharacterPage(input: {
        characterPage: {
          characterFk: "${characterId}",
          title: "${title}",
        }
      }) {
        characterPage {
          idPk
          title
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, createCharacterPage } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return createCharacterPage.characterPage;
}

export default createPage;
