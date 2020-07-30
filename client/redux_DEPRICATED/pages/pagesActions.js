import axios from 'axios';
import _reduce from 'lodash/reduce';
import { objToGraphqlStr } from '../../utils';
import {
  TOGGLE_EDITING,
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAILURE,
  UPDATE_PAGE_LAYOUT,
  UPDATE_PAGE_LAYOUT_SUCCESS,
  UPDATE_PAGE_LAYOUT_FAILURE,
  ADD_WIDGET,
  ADD_WIDGET_SUCCESS,
  ADD_WIDGET_FAILURE,
  REMOVE_WIDGET_FROM_PAGE,
  REMOVE_WIDGET_FROM_PAGE_SUCCESS,
  REMOVE_WIDGET_FROM_PAGE_FAILURE,
} from './pagesConstants';

function getPage(idPk) {
  return async (dispatch) => {
    dispatch({ type: GET_PAGE, payload: { idPk } });

    try {
      const query = `
        query {
          page:characterPage(idPk: "${idPk}") {
            idPk
            title
            widgets:pageWidgetsByPageFk {
              nodes {
                idPk
                type
                widgetId
                x
                y
                h:height
                w:width
              }
            }
          }
        }
      `;
      const res = await axios.post('/query/graphql', { query });
      const { page } = res.data.data;

      page.widgets = page.widgets.nodes;

      dispatch({ type: GET_PAGE_SUCCESS, payload: page }); 
    } catch (error) {
      dispatch({ type: GET_PAGE_FAILURE, payload: { error, idPk } });
    }
  }
}

function updatePageLayout(pageId, widgets) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PAGE_LAYOUT, payload: { pageId, widgets } });

    try {
      const mutations = _reduce(widgets, (res, { idPk, ...update }) => res + `
        update_${idPk}:updatePageWidget(input: {
            idPk: "${idPk}",
            patch: { ${objToGraphqlStr(update)} }
          }) {
            clientMutationId
          }
      `, '');
      const query = `
        mutation { ${mutations} }
      `;

      await axios.post('/query/graphql', { query });

      const fetchQuery = `
        query {
          page:characterPage(idPk: "${pageId}") {
            idPk
            title
            widgets:pageWidgetsByPageFk {
              nodes {
                idPk
                type
                widgetId
                x
                y
                h:height
                w:width
              }
            }
          }
        }
      `;
      const fetchRes = await axios.post('/query/graphql', { query: fetchQuery });
      const { page } = fetchRes.data.data;

      page.widgets = page.widgets.nodes;

      dispatch({ type: UPDATE_PAGE_LAYOUT_SUCCESS, payload: page });
    } catch (error) {
      dispatch({ type: UPDATE_PAGE_LAYOUT_FAILURE, payload: { idPk: pageId, error } });
    }
  }
}

function togglePagesEditMode() {
  return { type: TOGGLE_EDITING };
}

function addPageWidget(pageId, widget, layout) {
  return async (dispatch) => {
    dispatch({ type: ADD_WIDGET, payload: { pageId, widget, layout } });

    try {
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

      dispatch({ type: ADD_WIDGET_SUCCESS, payload: { pageId, widget: addedWidget } });
    } catch (error) {
      dispatch({ type: ADD_WIDGET_FAILURE, payload: { idPk: pageId, error } });
    }
  }
}

function removeWidgetFromPage(pageWidgetId, pageId) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_WIDGET_FROM_PAGE, payload: { pageWidgetId, pageId } });

    const query = `
      mutation {
        deletePageWidget(input: { idPk: "${pageWidgetId}"}) {
          clientMutationId
        }
      }
    `;

    try {
      await axios.post('/query/graphql', { query });

      dispatch({ type: REMOVE_WIDGET_FROM_PAGE_SUCCESS, payload: { pageWidgetId, pageId } });
    } catch (error) {
      dispatch({ type: REMOVE_WIDGET_FROM_PAGE_FAILURE, payload: error });
    }
  }
}

const pagesActions = {
  getPage,
  addPageWidget,
  togglePagesEditMode,
  updatePageLayout,
  removeWidgetFromPage,
};

export default pagesActions;
