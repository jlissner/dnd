import axios from 'axios';
import _pick from 'lodash/pick';
import { objToGraphqlStr } from '../../../utils';

async function updateTextBox({ idPk, ...patch }) {
  const validPatchOptions = _pick(patch, ['title', 'text', 'showTitle']);
  const query = `
    mutation {
      updateTextBox(input: {
        idPk: "${idPk}",
        patch: {
          ${objToGraphqlStr(validPatchOptions)}
        }
      }) {
        textBox {
          idPk
          userFk
          title
          text
          showTitle
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const updatedTextBox = data.data.updateTextBox.textBox;

  return updatedTextBox;
}

export default updateTextBox;
