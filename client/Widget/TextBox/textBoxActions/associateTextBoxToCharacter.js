import axios from 'axios';

async function associateTextBoxToCharacter(characterId, textBoxId) {
  const query = `
    mutation {
      createCharacterTextBox(
        input: {
          characterTextBox: {
            characterFk: "${characterId}",
            textBoxFk: "${textBoxId}",
          }
        }
      ) {
        clientMutationId
      }
    }
  `;

  const res = await axios.post('/query/graphql', { query });

  if (res.data.data.errors) {
    throw res.data.data.errors;
  }

  return res;
}

export default associateTextBoxToCharacter;
