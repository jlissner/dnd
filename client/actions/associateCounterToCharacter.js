import axios from 'axios';

async function associateCounterToCharacter(characterId, counterId) {
  const query = `
    mutation {
      createCharacterCounter(
        input: {
          characterCounter: {
            characterFk: "${characterId}",
            counterFk: "${counterId}",
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

export default associateCounterToCharacter;
