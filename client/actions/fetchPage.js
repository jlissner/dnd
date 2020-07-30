import axios from 'axios';
import _map from 'lodash/map';

async function fetchPage(pageId) {
  const query = `query {
    page:characterPage(idPk: "${pageId}") {
        idPk
        title
        layout:pageWidgetsByPageFk {
          nodes {
            idPk
          }
        }
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const pageData = res.data.data.page;

  pageData.layout = _map(pageData.layout.nodes, ({ idPk }) => idPk);

  return pageData;
}

export default fetchPage;
