import axios from 'axios';

async function fetchTextBox(idPk) {
  if (!idPk) {
    return null;
  }

  const query = `
    query {
      textBox(idPk: "${idPk}") {
        idPk
        userFk
        title
        text
        showTitle
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const { textBox } = res.data.data;

  return textBox;
}

export default fetchTextBox;
