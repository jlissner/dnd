import axios from 'axios';

async function fetchCharacter(idPk) {
  const query = `
    query {
      character(idPk: "${idPk}") {
        idPk
        attributes
        name
        notes
        pages:characterPages {
          nodes {
            idPk
            title
          }
        }
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const { character } = res.data.data;

  character.pages = character.pages.nodes;

  return character;
}

export default fetchCharacter;
