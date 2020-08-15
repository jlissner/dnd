import axios from 'axios';

async function fetchTextBoxesByCharacter(characterId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        textBoxes:characterTextBoxes {
          nodes {
            textBoxFk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const textBoxes = data.data.character.textBoxes.nodes;
  
  return textBoxes.map(({ textBoxFk }) => textBoxFk);
}

export default fetchTextBoxesByCharacter;
