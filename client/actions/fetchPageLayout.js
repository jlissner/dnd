import axios from 'axios';

async function fetchPageLayout(layoutId) {
  const query = `query {
    layout:pageWidget(idPk: "${layoutId}") {
        idPk
        pageFk
        type
        widgetId
        x
        y
        h:height
        w:width
      }
    }
  `;
  const res = await axios.post('/query/graphql', { query });
  const layoutData = res.data.data.layout;

  return layoutData;
}

export default fetchPageLayout;
