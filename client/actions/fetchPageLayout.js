import axios from 'axios';
import _get from 'lodash/get';

async function fetchPageLayout(layoutId) {
  const query = `query {
    layout:pageWidget(idPk: "${layoutId}") {
        idPk
        pageFk
        x
        y
        h:height
        w:width
        widgetFk
        type: widget {
          widgetType {
            name
          }
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { errors, layout } = data.data;

  if (errors) {
    throw new Error(errors)
  }

  layout.type = _get(layout, 'type.widgetType.name');

  return layout;
}

export default fetchPageLayout;
