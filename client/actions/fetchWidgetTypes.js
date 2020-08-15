import axios from 'axios';

async function fetchPage(pageId) {
  const query = `query {
    widgetTypes {
      nodes {
          idPk
          name
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { errors, widgetTypes } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return widgetTypes.nodes;
}

export default fetchPage;
