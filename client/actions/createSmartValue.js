import axios from 'axios';
import { objToGraphqlStr } from '../utils';

async function createSmartValue(newSmartValue) {
  const query = `
    mutation {
      createSmartValue(input: {
        smartValue: {
          ${objToGraphqlStr(newSmartValue)}
        }
      }) {
        smartValue {
          idPk
          key
          value
          min
          max
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, createSmartValue } = data.data;

  if (errors) {
    throw errors;
  }

  return createSmartValue.smartValue;
}

export default createSmartValue;
