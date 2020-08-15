import axios from 'axios';

async function fetchStatsByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        stats {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const stats = data.data.character.stats.nodes;
  
  return stats.map(({ idPk }) => idPk);
}

export default fetchStatsByCharacter;
