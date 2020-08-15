import axios from 'axios';
import _map from 'lodash/map';

async function fetchSmartValuesByCharacter(characterId) {
  if (!characterId) {
    return null;
  }

  const query = `
    query {
      character(idPk: "${characterId}") {
        smartValues:characterSmartValues {
          nodes {
            smartValueFk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const { errors, character } = data.data;

  if (errors) {
    throw errors;
  }

  return _map(character.smartValues.nodes, ({ smartValueFk }) => smartValueFk);
}