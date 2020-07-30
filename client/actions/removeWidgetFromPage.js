import axios from 'axios';

async function removeWidgetFromPage(pageWidgetId) {
  const query = `
    mutation {
      deletePageWidget(input: { idPk: "${pageWidgetId}"}) {
        clientMutationId
      }
    }
  `;

  await axios.post('/query/graphql', { query });

  return pageWidgetId;
}

export default removeWidgetFromPage;
