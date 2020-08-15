import axios from 'axios';

async function deleteCounter({ attributeFk, modifierFk }) {
  const query = `
    mutation {
      delAttr:deleteSmartValue(input: {idPk: "${attributeFk}"}) {
        clientMutationId
      }
      delMod:deleteSmartValue(input: {idPk: "${modifierFk}"}) {
        clientMutationId
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return { attributeFk, modifierFk };
}

export default deleteCounter;
