import axios from 'axios';

async function fetchCounter(idPk) {
  const query = `
    query {
      counter(idPk: "${idPk}") {
        idPk
        userFk
        title
        value
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const { counter } = res.data.data;

  return counter;
}

export default fetchCounter;
