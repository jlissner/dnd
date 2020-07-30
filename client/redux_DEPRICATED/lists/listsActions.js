import axios from 'axios';
import _reduce from 'lodash/reduce';
import _transform from 'lodash/transform';
import { objToGraphqlStr } from '../../utils';
import {
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE,
  GET_USER_LISTS,
  GET_USER_LISTS_SUCCESS,
  GET_USER_LISTS_FAILURE,
  ADD_LIST_ITEM,
  ADD_LIST_ITEM_SUCCESS,
  ADD_LIST_ITEM_FAILURE,
  UPDATE_LIST_ITEM,
  UPDATE_LIST_ITEM_SUCCESS,
  UPDATE_LIST_ITEM_FAILURE,
  REORDER_LIST_ITEMS,
  REORDER_LIST_ITEMS_SUCCESS,
  REORDER_LIST_ITEMS_FAILURE,
  REMOVE_LIST_ITEM,
  REMOVE_LIST_ITEM_SUCCESS,
  REMOVE_LIST_ITEM_FAILURE,
  CREATE_LIST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAILURE,
  UPDATE_LIST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAILURE,
  DELETE_LIST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
} from './listsConstants';

function deleteList(listId) {
  return async (dispatch) => {
    dispatch({ type: DELETE_LIST, payload: listId });
    const query = `
      mutation {
        deleteList(input: {idPk: "${listId}"}) {
          clientMutationId
        }
      }
    `;

    try {
      const res = await axios.post('/query/graphql', { query });

      if (res.data.data.errors) {
        throw new Error(res.data.errors);
      }

      dispatch({ type: DELETE_LIST_SUCCESS, payload: listId });
    } catch (error) {
      dispatch({ type: DELETE_LIST, payload: listId });
    }
  }
}

function updateList({ idPk, type, ...patch }) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LIST, payload: patch });
    const query = `
      mutation {
        updateList(input: {
          idPk: "${idPk}",
          patch: {
            type: ${type},
            ${objToGraphqlStr(patch)}
          }
        }) {
          list {
            idPk
            title
            type
            showTitle
          }
        }
      }
    `;

    try {
      const { data } = await axios.post('/query/graphql', { query });
      const updatedList = data.data.updateList.list;

      dispatch({ type: UPDATE_LIST_SUCCESS, payload: updatedList });
    } catch (error) {
      dispatch({ type: UPDATE_LIST_FAILURE, payload: error });
    }
  }
}

function createList(list) {
  return async (dispatch) => {
    dispatch({ type: CREATE_LIST, payload: list });

    try {
      const query = `
        mutation {
          createList(
            input: {
              list: {
                title: "${list.title}",
                type: ${list.type},
                userFk: "${list.userFk}",
                showTitle: ${list.showTitle}
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
      const res = await axios.post('/query/graphql', { query });
      const newList = res.data.data.createList.list;

      dispatch({ type: CREATE_LIST_SUCCESS, payload: newList });
    } catch (error) {
      dispatch({ type: CREATE_LIST_FAILURE, payload: { idPk: 'new' }});
    }
  }
}

function getList(idPk) {
  return async (dispatch) => {
    dispatch({ type: GET_LIST, payload: { idPk } });

    try {
      const query = `
        query {
          list(idPk: "${idPk}") {
            idPk
            title
            type
            showTitle
            listItems {
              nodes {
                idPk
                text
                checked
                listOrder
              }
            }
          }
        }
      `;
      const res = await axios.post('/query/graphql', { query });
      const { list } = res.data.data;

      list.listItems = list.listItems.nodes;

      dispatch({ type: GET_LIST_SUCCESS, payload: list }); 
    } catch (error) {
      dispatch({ type: GET_LIST_FAILURE, payload: { idPk, error } });
    }
  }
}

function addListItem(idPk, listOrder) {
  return async (dispatch) => {
    dispatch({ type: ADD_LIST_ITEM, payload: { idPk, listOrder } });

    try {
      const query = `
        mutation {
          createListItem(input: {listItem: {
            listFk: "${idPk}",
            text: "",
            checked: false,
            listOrder: ${listOrder}
          }}) {
            listItem {
              idPk
              text
              checked
              listOrder
            }
          }
        }
      `;
      const res = await axios.post('/query/graphql', { query });
      const { listItem } = res.data.data.createListItem;

      dispatch({ type: ADD_LIST_ITEM_SUCCESS, payload: { idPk, listItem }});
    } catch (error) {
      dispatch({ type: ADD_LIST_ITEM_FAILURE, payload: error });
    }
  };
}

function updateListItem(listId, { idPk, ...patch }) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LIST_ITEM, payload: { listId, widgetId: idPk, ...patch } });

    try {
      const query = `
        mutation {
          updateListItem(input: {
            idPk: "${idPk}",
            patch: {${objToGraphqlStr(patch)}}
          }) {
            listItem {
              idPk
              text
              checked
              listOrder
            }
          }
        }
      `;

      const res = await axios.post('/query/graphql', { query });
      const { listItem } = res.data.data.updateListItem;

      dispatch({ type: UPDATE_LIST_ITEM_SUCCESS, payload: { listId, widgetId: idPk, listItem }});
    } catch (error) {
      dispatch({ type: UPDATE_LIST_ITEM_FAILURE, payload: { idPk: listId, error} });
    }
  };
}

function reorderListItems(listId, items) {
  return async (dispatch) => {
    if (items.length === 0) {
      return;
    }

    dispatch({ type: REORDER_LIST_ITEMS, payload: { listId, items } });

    try {
      const updates = _reduce(items, (res, { idPk, listOrder }) => (
        `${res}
          update${idPk}:updateListItem(input: {
              idPk: "${idPk}",
              patch: {
                listOrder: ${listOrder}
              }
            }) {
              clientMutationId
            }
        `
      ), '');
      const query = `mutation { ${updates} }`;

      await axios.post('/query/graphql', { query });

      const fetchQuery = `
        query {
          list(idPk: "${listId}") {
            idPk
            title
            type
            showTitle
            listItems {
              nodes {
                idPk
                text
                checked
                listOrder
              }
            }
          }
        }
      `;
      const fetchRes = await axios.post('/query/graphql', { query: fetchQuery });
      const { list } = fetchRes.data.data;

      list.listItems = list.listItems.nodes;

      dispatch({ type: REORDER_LIST_ITEMS_SUCCESS, payload: list });
    } catch (error) {
      dispatch({ type: REORDER_LIST_ITEMS_FAILURE, payload: { idPk: listId, error} });
    }
  };
}

function removeListItem(listId, widgetId) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_LIST_ITEM, payload: { widgetId } });

    try {
      const query = `
        mutation {
          deleteListItem(input: {idPk: "${widgetId}"}) {
            clientMutationId
          }
        }
      `;

      const res = await axios.post('/query/graphql', { query });
      const { clientMutationId } = res.data.data.deleteListItem;

      dispatch({type: REMOVE_LIST_ITEM_SUCCESS, payload: { listId, widgetId, clientMutationId }});
    } catch (error) {
      dispatch({ type: REMOVE_LIST_ITEM_FAILURE, payload: { idPk: listId, error }});
    } 
  };
}

const characterActions = {
  deleteList,
  createList,
  getList,
  updateList,
  addListItem,
  updateListItem,
  reorderListItems,
  removeListItem,
};

export default characterActions;
