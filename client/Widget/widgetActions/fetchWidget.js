import axios from 'axios';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _transform from 'lodash/transform';

async function fetchWidget(widgetId) {
  if (!widgetId) {
    return null;
  }

  const query = `
    query {
      widget(idPk: "${widgetId}") {
        idPk
        name
        characterFk
        widgetTypeFk
        dumbValues
        smartValues {
          nodes {
            key
            idPk
          }
        }
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const { errors, widget } = res.data.data;

  if (errors) {
    throw new Error(errors);
  }

  const baseValues = _pick(widget, ['idPk', 'name', 'characterFk', 'widgetTypeFk', 'dumbValues']);
  const formattedWidget = _transform(_get(widget, 'smartValues.nodes'), (res, { key, idPk }) => {
    res[key] = idPk;
  }, baseValues);

  return formattedWidget;
}

export default fetchWidget;