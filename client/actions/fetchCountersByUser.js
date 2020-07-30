import axios from 'axios';

async function fetchCounterByUser(userId) {
  const query = `
    query {
      user(idPk: "${userId}") {
        counters {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const counters = data.data.user.counters.nodes;
  
  return counters.map(({ idPk }) => idPk);
}

export default fetchCounterByUser;
