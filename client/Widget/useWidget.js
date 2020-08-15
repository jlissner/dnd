import { useCallback, useMemo, useState } from 'react';
import {
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _without from 'lodash/without';
import {
  characterWidgetsState,
  selectedCharacterState,
  selectedPageState,
  smartValueState,
  smartValueModifierState,
  widgetState,
} from '../state';
import { usePage } from '../hooks';
import {
  deleteWidget,
  updateWidget,
} from './widgetActions';
import widgetSelector from './widgetSelector';

function useWidget2(widgetId) {
  const [saving, setSaving] = useState(false);
  const setWidget = useSetRecoilState(widgetState(widgetId));
  const widget = useRecoilValue(widgetSelector(widgetId));
  const characterId = useRecoilValue(selectedCharacterState);
  const selectedPage = useRecoilValue(selectedPageState);
  const { addWidgetToPage } = usePage(selectedPage);
  const handleUpdates = useRecoilCallback(({ set }) => ({
    updatedWidget,
    // createdSmartValues, // we'll fetch and format these as needed
    createdSmartValueModifiers,
    updatedSmartValues,
    updatedSmartValueModifiers,
    deletedSmartValues,
    deletedSmartValueModifiers,
  }) => {
    setWidget(curWidget => ({
      ...curWidget,
      ..._pick(updatedWidget, ['name', 'dumbValues']),
    }));

    _forEach(updatedSmartValues, (updates) => set(smartValueState(String(updates.idPk)), cur => ({
      ...cur,
      name: updates.name,
      value: updates.value,
      min: String(updates.min),
      max: String(updates.max),
    })));
    _forEach(deletedSmartValues, (d) => set(smartValueState(String(d.idPk)), null));
    _forEach(createdSmartValueModifiers, (c) => set(smartValueModifierState(String(c.idPk)), {
      idPk: String(c.idPk),
      smartValueFk: String(c.smartValueFk),
      type: c.type,
      smartValueRefFk: String(c.smartValueRefFk),
      active: c.active,
      min: String(c.min),
      max: String(c.max),
      listOrder: String(c.listOrder),
    }));
    _forEach(createdSmartValueModifiers, (c) => set(smartValueState(String(c.smartValueFk)), (cur) => ({
      ...cur,
      modifiers: [...cur.modifiers, String(c.idPk)],
    })));
    _forEach(updatedSmartValueModifiers, (u) => set(smartValueModifierState(String(u.idPk)), {
      idPk: String(u.idPk),
      smartValueFk: String(u.smartValueFk),
      type: u.type,
      smartValueRefFk: String(u.smartValueRefFk),
      active: u.active,
      min: String(u.min),
      max: String(u.max),
      listOrder: String(u.listOrder)
    }));
    _forEach(deletedSmartValueModifiers, (d) => set(smartValueModifierState(String(d.idPk)), null));
  });
  const setCharacterWidgets = useSetRecoilState(characterWidgetsState({
    characterId,
    typeId: _get(widget, 'widgetType.idPk'),
  }));

  const attemptSaveable = useCallback((func, onError) => {
    return async (...args) => {
      setSaving(true);

      try {
        await func(...args);
      } catch (error) {
        console.error(error);

        if (onError) {
          onError(error);
        }
      }

      setSaving(false);
    }
  }, []);

  return useMemo(() => ({
    widget,
    setWidget,
    saving,
    attemptSaveable,
    update: attemptSaveable(async (updates) => {
      const res = await updateWidget({ idPk: widgetId, ...updates });

      handleUpdates(res);
    }),
    updateDumbValue: attemptSaveable(async (key, value) => {
      const newValue = typeof value === 'function' ? value(widget) : value;
      const res = await updateWidget({
        idPk: widgetId,
        dumbValues: {
          ...widget.dumbValues,
          [key]: newValue,
        },
      });

      handleUpdates(res);
    }),
    remove: attemptSaveable(async () => {
      await deleteWidget(widget);

      setCharacterWidgets((characterWidgets) => _without(characterWidgets, widgetId));
      setWidget(null);
    }),
    addToPage: attemptSaveable(async () => {
      await addWidgetToPage(widget.widgetType.name, widgetId)
    }, console.error),
  }), [
    addWidgetToPage,
    widgetId,
    setCharacterWidgets,
    widget,
    setWidget,
    saving,
    attemptSaveable,
    handleUpdates,
  ]);
}

export default useWidget2;
