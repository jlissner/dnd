import axios from 'axios';

async function fetchAttribute(attributeId) {
  if (!attributeId) {
    return null;
  }

  const query = `
    query {
      characterAttribute(attributeFk: "${attributeId}") {
        characterFk
        attributeFk
        attributeModifierFk
        name
        abbr
        notes
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, characterAttribute } = data.data;
  
  if (errors) {
    throw new Error(errors);
  }

  return characterAttribute;
}

export default fetchAttribute;
