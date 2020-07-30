import axios from 'axios';

async function fetchListsByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        lists:characterLists {
          nodes {
            listFk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const lists = data.data.character.lists.nodes;
  
  return lists.map(({ listFk }) => listFk);
}

export default fetchListsByCharacter;
