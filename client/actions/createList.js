import axios from 'axios';
import associateListToCharacter from './associateListToCharacter';

async function createList(newList, characterId) {
  const query = `
    mutation {
      createList(
        input: {
          list: {
            title: "${newList.title}",
            type: ${newList.type},
            userFk: "${newList.userFk}",
            showTitle: ${newList.showTitle}
          }
        }
      ) {
        list {
          idPk
          title
          type
          userFk
          showTitle
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { list } = data.data.createList;

  if (characterId) {
    await associateListToCharacter(characterId, list.idPk);
  }
  
  return list;
}

export default createList;
