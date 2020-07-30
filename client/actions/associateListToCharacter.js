import axios from 'axios';

async function associateListToCharacter(characterId, listId) {
  const query = `
    mutation {
      createCharacterList(
        input: {
          characterList: {
            characterFk: "${characterId}",
            listFk: "${listId}",
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

export default associateListToCharacter;
