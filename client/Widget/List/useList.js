import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _pick from 'lodash/pick';
import _reject from 'lodash/reject';
import {
  characterWidgetsState,
  selectedCharacterState,
  widgetTypesState,
} from '../../state';
import { removeByIndex } from '../../utils';
import { createWidget } from '../widgetActions';
import useWidget from '../useWidget';

const listSchema = {
  dumbValues: ['listItems', 'showTitle', 'type'],
};

function useList(listId) {
  const characterId = useRecoilValue(selectedCharacterState);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'List']).idPk;
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    widget,
    saving,
    update,
    updateDumbValue,
    remove,
    addToPage,
    attemptSaveable,
  } = useWidget(listId);
  const list = useMemo(() => widget && ({
    ...widget,
    listItems: _sortBy(widget.listItems, ['checked']),
  }), [widget]);

  return useMemo(() => ({
    list,
    saving,
    addToPage,
    deleteList: remove,
    update: (updates) => {
      const dumbValues = _pick(updates, listSchema.dumbValues);

      update({ dumbValues });
    },
    create: attemptSaveable(async ({ name, type, showTitle }) => {
      const createdWidget = await createWidget({
        name: name,
        characterId,
        widgetTypeId: typeId,
        dumbValues: { type, listItems: [], showTitle },
      });

      setCharacterWidgets([...characterWidgets, createdWidget.idPk]);
    }),
    addItem: async () => {
      const updatedListItems = [...list.listItems, { text: '', checked: false }];

      await updateDumbValue('listItems', updatedListItems);
    },
    updateItem: async ({ index, ...patch }) => {
      const updatedListItems = _cloneDeep(list.listItems);
      const updatedListItem = {
        ...updatedListItems[index],
        ...patch,
      };

      updatedListItems[index] = updatedListItem;
      
      await updateDumbValue('listItems', updatedListItems);
    },
    reorderItems: async (items) => {
      if (items.length === 0) {
        return;
      }

      if (items.length !== list.listItems.length) {
        const unTounchedItems = _reject(list.listItems, item => _find(items, ['text', item.text]));

        await updateDumbValue('listItems', [...items, ...unTounchedItems]);
      } else {
        await updateDumbValue('listItems', items);
      }
    },
    removeItem: async (index) => {
      const updatedListItems = removeByIndex(list.listItems, index);

      await updateDumbValue('listItems', updatedListItems);
    },
  }), [
    attemptSaveable,
    list,
    saving,
    update,
    remove,
    addToPage,
    characterId,
    characterWidgets,
    setCharacterWidgets,
    typeId,
    updateDumbValue,
  ]);
}

export default useList;
