import axios from 'axios';
import { createSmartValue } from '../../../actions';

async function createStat(newStat, characterId) {
  const smartValue = await createSmartValue({ value: newStat.baseValue, name: newStat.title });
  const query = `
    mutation {
      createStat(
        input: {
          stat: {
            characterFk: "${characterId}",
            title: "${newStat.title}",
            smartValueFk: "${smartValue.idPk}",
            type: ${newStat.type},
          }
        }
      ) {
        stat {
          idPk
          characterFk
          title
          smartValueFk
          type
          notes
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { stat } = data.data.createStat;

  return stat;
}

export default createStat;
