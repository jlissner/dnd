import axios from 'axios';
import _get from 'lodash/get';
import _map from 'lodash/map';
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
        layout:pageWidgetsByPageFk {
          nodes {
            idPk
            widgetFk
            x
            y
            h:height
            w:width
            type: widget {
              widgetType {
                name
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query: fetchQuery });
  const { errors, page } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return _map(page.layout.nodes, (layout) => ({
    ...layout,
    type: _get(layout, 'type.widgetType.name'),
  }));
}

export default updatePageLayout;
