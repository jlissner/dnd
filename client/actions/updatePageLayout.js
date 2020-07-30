import axios from 'axios';
import _reduce from 'lodash/reduce';
import { objToGraphqlStr } from '../utils';

async function updatePageLayout(pageId, widgets) {
  const mutations = _reduce(widgets, (res, { idPk, ...update }) => res + `
    update_${idPk}:updatePageWidget(input: {
        idPk: "${idPk}",
        patch: { ${objToGraphqlStr(update)} }
      }) {
        clientMutationId
      }
  `, '');
  const query = `
    mutation { ${mutations} }
  `;

  await axios.post('/query/graphql', { query });

  const fetchQuery = `
    query {
      page:characterPage(idPk: "${pageId}") {
        idPk
        title
        layout:pageWidgetsByPageFk {
          nodes {
            idPk
            type
            widgetId
            x
            y
            h:height
            w:width
          }
        }
      }
    }
  `;
  const fetchRes = await axios.post('/query/graphql', { query: fetchQuery });
  const { page } = fetchRes.data.data;

  return page.layout.nodes;
}

export default updatePageLayout;
