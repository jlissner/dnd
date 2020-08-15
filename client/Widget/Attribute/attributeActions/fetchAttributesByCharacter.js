import axios from 'axios';

async function fetchAttributesByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        attributes:characterAttributes {
          nodes {
            attributeFk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const attributes = data.data.character.attributes.nodes;
  
  return attributes.map(({ attributeFk }) => attributeFk);
}

export default fetchAttributesByCharacter;
