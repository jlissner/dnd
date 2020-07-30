import _cloneDeep from 'lodash/cloneDeep';
import _defaultsDeep from 'lodash/defaultsDeep';
import _reject from 'lodash/reject';
import {
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAILURE,
  UPDATE_PAGE_LAYOUT_SUCCESS,
  UPDATE_PAGE_LAYOUT_FAILURE,
  ADD_WIDGET_SUCCESS,
  TOGGLE_EDITING,
  REMOVE_WIDGET_FROM_PAGE_SUCCESS,
} from './pagesConstants';

const initialState = {
  editing: false,
};

function pagesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REMOVE_WIDGET_FROM_PAGE_SUCCESS: {
      const { pageWidgetId, pageId } = payload;
      const newState = _cloneDeep(state);

      newState[pageId].widgets = _reject(newState[pageId].widgets, ['idPk', pageWidgetId]);

      return newState;
    }
    case ADD_WIDGET_SUCCESS: {
      const newState = _cloneDeep(state);

      newState[payload.pageId].widgets.push(payload.widget);

      return newState;
    }
    case GET_PAGE: {
      return _defaultsDeep({
        [payload.idPk]: {
          loading: true,
        },
      }, state);
    }
    case UPDATE_PAGE_LAYOUT_SUCCESS:
    case GET_PAGE_SUCCESS: {
      return _defaultsDeep({
        [payload.idPk]: {
          ...payload,
          loading: false,
          error: false,
        },
      }, state);
    }
    case UPDATE_PAGE_LAYOUT_FAILURE:
    case GET_PAGE_FAILURE: {
      return _defaultsDeep({
        [payload.idPk]: {
          loading: false,
          error: payload.error,
        },
      }, state);
    }
    case TOGGLE_EDITING: {
      return {
        ...state,
        editing: !state.editing,
      };
    }
    default: {
      return state;
    }
  }
}

export default pagesReducer;
