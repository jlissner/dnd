import axios from 'axios';
import _get from 'lodash/get';

async function addWidgetToPage(pageId, widget, layout) {
  const query = `
    mutation {
      createPageWidget(
        input: {
          pageWidget: {
            pageFk: "${pageId}"
            widgetFk: "${widget.idPk}"
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
          widgetFk
          type: widget {
            widgetType {
              name
            }
          }
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

  addedWidget.type = _get(addedWidget, 'type.widgetType.name');

  return addedWidget;
}

export default addWidgetToPage;
