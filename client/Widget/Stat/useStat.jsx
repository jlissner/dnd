import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { useSmartValue } from '../../hooks/';
import {
  characterWidgetsState,
  selectedCharacterState,
  widgetTypesState,
} from '../../state';
import { createWidget } from '../widgetActions';
import useWidget from '../useWidget';
import { getNewValueInfo } from './statUtils';

function useStat(id) {
  const characterId = useRecoilValue(selectedCharacterState);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'Stat']).idPk;
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    widget: stat,
    updateDumbValue,
    update,
    remove,
    addToPage,
    saving,
    attemptSaveable,
  } = useWidget(id);
  const { smartValue } = useSmartValue(_get(stat, 'value'));
  const statWithValue = useMemo(() => {
    if (!stat || !smartValue) {
      return null;
    }

    return {
      ...stat,
      value: smartValue.value,
      baseValue: smartValue.baseValue,
    };
  }, [stat, smartValue]);
  
  return useMemo(() => ({
    stat: statWithValue,
    saving,
    updateStatValue: (updatedVal) => {
      const { newValue } = getNewValueInfo(statWithValue.value, String(updatedVal));

      if (String(newValue) === _get(statWithValue, 'baseValue')) {
        return;
      }

      return update({ values: [{
        idPk: _get(stat, 'value'),
        value: newValue,
      }]});
    },
    updateStatNotes: (newNotes) => {
      if (newNotes === stat.notes) {
        return;
      }

      return updateDumbValue('notes', newNotes);
    },
    update: (statUpdates) => update({
      name: statUpdates.name,
      values: [{
        idPk: smartValue.idPk,
        value: statUpdates.baseValue,
      }],
      dumbValues: {
        ...stat.dumbValues,
        type: statUpdates.type,
      },
    }),
    create: attemptSaveable(async (statToCreate) => {
      const createdWidget = await createWidget({
        name: statToCreate.name,
        characterId,
        widgetTypeId: typeId,
        values: [{
          key: 'value',
          value: statToCreate.baseValue,
        }],
        dumbValues: { notes: '', type: statToCreate.type }
      });

      setCharacterWidgets([...characterWidgets, createdWidget.idPk]);
    }),
    remove,
    addToPage,
  }), [
    smartValue.idPk,
    characterId,
    typeId,
    characterWidgets,
    setCharacterWidgets,
    updateDumbValue,
    stat,
    statWithValue,
    saving,
    addToPage,
    attemptSaveable,
    remove,
    update,
  ]);
}

export default useStat;
