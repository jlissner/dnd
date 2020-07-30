import axios from 'axios';
import associateCounterToCharacter from './associateCounterToCharacter';

async function createCounter(newCounter, characterId) {
  const query = `
    mutation {
      createCounter(
        input: {
          counter: {
            userFk: "${newCounter.userFk}",
            title: "${newCounter.title}",
            value: "${newCounter.value}",
          }
        }
      ) {
        counter {
          idPk
          userFk
          title
          value
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { counter } = data.data.createCounter;

  if (characterId) {
    await associateCounterToCharacter(characterId, counter.idPk);
  }
  
  return counter;
}

export default createCounter;
