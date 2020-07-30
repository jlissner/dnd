import _cloneDeep from 'lodash/cloneDeep';
import _defaults from 'lodash/defaults';
import _defaultsDeep from 'lodash/defaultsDeep';
import _findIndex from 'lodash/findIndex';
import _reject from 'lodash/reject';
import {
  CREATE_LIST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAILURE,
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE,
  GET_USER_LISTS,
  GET_USER_LISTS_SUCCESS,
  GET_USER_LISTS_FAILURE,
  ADD_LIST_ITEM_SUCCESS,
  ADD_LIST_ITEM_FAILURE,
  UPDATE_LIST_ITEM_SUCCESS,
  UPDATE_LIST_ITEM_FAILURE,
  REORDER_LIST_ITEMS_SUCCESS,
  REMOVE_LIST_ITEM_SUCCESS,
  REMOVE_LIST_ITEM_FAILURE,
  UPDATE_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
} from './listsConstants';

const initialState = {
  lastCreated: {
    saving: false,
  }
};

function listsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DELETE_LIST_SUCCESS: {
      const newState = _cloneDeep(state);

      delete newState[payload];

      return newState;
    }

    case UPDATE_LIST_SUCCESS: {
      return {
        ...state,
        [payload.idPk]: payload,
      }
    }
    case CREATE_LIST: {
      return {
        ...state,
        lastCreated: {
          saving: true,
        },
      };
    }
    case CREATE_LIST_SUCCESS: {
      return {
        ...state,
        [payload.idPk]: payload,
        lastCreated: payload,
      };
    }
    case CREATE_LIST_FAILURE: {
      return {
        ...state,
        lastCreated: {
          error: payload,
        },
      };
    }
    case GET_LIST: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          loading: true,
        },
      }, state);

      return newState;
    }
    case GET_LIST_SUCCESS:
    case REORDER_LIST_ITEMS_SUCCESS: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          ...payload,
          loading: false,
          error: false,
        },
      }, state);

      return newState;
    }
    case GET_LIST_FAILURE:
    case ADD_LIST_ITEM_FAILURE:
    case UPDATE_LIST_ITEM_FAILURE:
    case REMOVE_LIST_ITEM_FAILURE: {
      const newState = _defaultsDeep({
        [payload.idPk]: {
          loading: false,
          error: payload.error,
        },
      }, state);

      return newState;
    }
    case ADD_LIST_ITEM_SUCCESS: {
      const newState = _cloneDeep(state);

      newState[payload.idPk].listItems = newState[payload.idPk].listItems || [];
      newState[payload.idPk].listItems.push(payload.listItem);

      return newState;
    }
    case UPDATE_LIST_ITEM_SUCCESS: {
      const curListItems = state[payload.listId].listItems
      const updatedIndex = _findIndex(curListItems, ['idPk', payload.widgetId]);
      const newListItems = [...curListItems];
      newListItems[updatedIndex] = payload.listItem;

      const newState = _defaultsDeep({
        [payload.listId]: {
          listItems: newListItems,
        },
      }, state);

      return newState;
    }
    case REMOVE_LIST_ITEM_SUCCESS: {
      const newListItems = _reject(state[payload.listId].listItems, ['idPk', payload.widgetId]);
      const newState = _cloneDeep(state);
      
      newState[payload.listId].listItems = newListItems;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default listsReducer;
