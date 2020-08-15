import axios from 'axios';
import associateTextBoxToCharacter from './associateTextBoxToCharacter';

async function createTextBox(newTextBox, characterId) {
  const query = `
    mutation {
      createTextBox(
        input: {
          textBox: {
            userFk: "${newTextBox.userFk}",
            title: "${newTextBox.title}",
            showTitle: ${newTextBox.showTitle},
            text: "${newTextBox.text || ''}",
          }
        }
      ) {
        textBox {
          idPk
          userFk
          title
          showTitle
          text
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { textBox } = data.data.createTextBox;

  if (characterId) {
    await associateTextBoxToCharacter(characterId, textBox.idPk);
  }
  
  return textBox;
}

export default createTextBox;
