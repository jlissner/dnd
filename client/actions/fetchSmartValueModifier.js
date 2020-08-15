import axios from 'axios';

async function fetchSmartValueModifier(smartValueModifierId) {
  if (!smartValueModifierId) {
    return null;
  }

  const query = `
    {
      smartValueModifier(idPk: "${smartValueModifierId}") {
        idPk
        smartValueFk
        type
        smartValueRefFk
        active
        min
        max
        listOrder
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, smartValueModifier } = data.data;

  if (errors) {
    throw errors;
  }

  return smartValueModifier;
}

export default fetchSmartValueModifier;
