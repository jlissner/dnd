import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../../../utils';

async function updateSkill({ idPk, type, ...patch }) {
  const validPatchOptions = _pick(patch, ['title', 'notes']);
  const query = `
    mutation {
      updatedSkill:updateSkill(input: {
        idPk: "${idPk}",
        patch: {
          ${type ? `type: ${type},` : ''}
          ${objToGraphqlStr(validPatchOptions)}
        }
      }) {
        skill {
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
  const { errors, updatedSkill } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  return updatedSkill.skill;
}

export default updateSkill;
