import axios from 'axios';

async function fetchCounterByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        counters:characterCounters {
          nodes {
            counterFk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const counters = data.data.character.counters.nodes;
  
  return counters.map(({ counterFk }) => counterFk);
}

export default fetchCounterByCharacter;
