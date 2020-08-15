import axios from 'axios';

async function fetchStat(idPk) {
  if (!idPk) {
    return null;
  }

  const query = `
    query {
      stat(idPk: "${idPk}") {
        idPk
        characterFk
        title
        smartValueFk
        type
        notes
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { errors, stat } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return stat;
}

export default fetchStat;
