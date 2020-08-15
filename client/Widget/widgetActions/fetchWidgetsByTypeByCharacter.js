import axios from 'axios';

async function fetchWidgetsByTypeByCharacter(characterId, typeId) {
  const query = `
    query {
      character(idPk: "${characterId}") {
        widgets(filter: { widgetTypeFk: { equalTo: "${typeId}"} }) {
          nodes {
            idPk
          }
        }
      }
    }
  `;

  const { data } = await axios.post('/query/graphql', { query });
  const widgets = data.data.character.widgets.nodes;
  
  return widgets.map(({ idPk }) => idPk);
}

export default fetchWidgetsByTypeByCharacter;
