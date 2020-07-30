import axios from 'axios';

async function fetchListsByUser(userId) {
  const query = `
    query {
      user(idPk: "${userId}") {
        lists {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const lists = data.data.user.lists.nodes;
  
  return lists.map(({ idPk }) => idPk);
}

export default fetchListsByUser;
