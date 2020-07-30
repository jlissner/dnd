import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _reject from 'lodash/reject';
import { widgetState } from '../state';
import {
  addListItem,
  updateListItem,
  reorderListItems,
  removeListItem,
} from '../actions';

function useList(listId) {
  /*
   * [x] replace useSelectore with useRecoilState
   * [x] move all actions to actions file
   * [ ] make all actions work
   * [ ] transform to 'useWidget'
   *   [ ] make generic
   *   [ ] leverage manifest file
  **/
  const [list, setList] = useRecoilState(widgetState({ type: 'LIST', widgetId: listId }));
  const res = useMemo(() => ({
    list,
    addItem: async (listOrder) => {
      const newListItem = await addListItem(listId, listOrder);
      const updatedList = _cloneDeep(list);

      updatedList.listItems.push(newListItem);

      setList(updatedList);
    },
    updateItem: async ({ idPk, ...patch }) => {
      const updatedListItem = await updateListItem({ idPk, ...patch });
      const updatedList = _cloneDeep(list);
      const index = _findIndex(updatedList.listItems, ['idPk', idPk]);
      
      updatedList.listItems[index] = updatedListItem;

      setList(updatedList);
    },
    reorderItems: async (items) => {
      const updatedList = await reorderListItems(listId, items);

      setList(updatedList);
    },
    removeItem: async (listItemId) => {
      const removedItemId = await removeListItem(listItemId);
      const updatedList = _cloneDeep(list);

      updatedList.listItems = _reject(updatedList.listItems, ['idPk', removedItemId]);

      setList(updatedList);
    },
  }), [
    list,
    listId,
    setList,
  ]);

  return res;
}

export default useList;
