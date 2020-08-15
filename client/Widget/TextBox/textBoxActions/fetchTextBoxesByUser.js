import axios from 'axios';

async function fetchTextBoxesByUser(userId) {
  const query = `
    query {
      user(idPk: "${userId}") {
        textBoxes {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const textBoxes = data.data.user.textBoxes.nodes;
  
  return textBoxes.map(({ idPk }) => idPk);
}

export default fetchTextBoxesByUser;
