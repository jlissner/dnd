import axios from 'axios';

async function addWidgetToPage(pageId, widget, layout) {
  const query = `
    mutation {
      createPageWidget(
        input: {
          pageWidget: {
            pageFk: "${pageId}"
            type: ${widget.type}
            widgetId: "${widget.idPk}"
            x: ${layout.x}
            y: ${layout.y}
            height: ${layout.height}
            width: ${layout.width}
          }
        }
      ) {
        pageWidget {
          idPk
          pageFk
          type
          widgetId
          x
          y
          w: width
          h: height
        }
      }
    }
  `;
  const { data } = await axios.post('/query/graphql', { query });
  const addedWidget = data.data.createPageWidget.pageWidget

  return addedWidget;
}

export default addWidgetToPage;
