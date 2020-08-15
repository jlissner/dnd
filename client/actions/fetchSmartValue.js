import axios from 'axios';
import _get from 'lodash/get';
import _map from 'lodash/map';

async function fetchSmartValue(smartValueId) {
  if (!smartValueId) {
    return null;
  }

  const query = `
    {
      smartValue(idPk: "${smartValueId}") {
        idPk
        key
        value
        min
        max
        modifiers:smartValueModifiers {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, smartValue } = data.data;
  const originalModifiers = _get(smartValue, 'modifiers.nodes', []);

  if (errors) {
    throw errors;
  }

  if (!smartValue) {
    return smartValue;
  }

  smartValue.modifiers = _map(originalModifiers, ({ idPk }) => idPk);

  return smartValue;
}

export default fetchSmartValue;
