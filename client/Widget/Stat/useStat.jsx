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
    setWidget: setStat,
    updateDumbValue,
    update,
    remove,
    addToPage,
    saving,
    attemptSaveable,
  } = useWidget(id);
  const { smartValue, updateValue } = useSmartValue(_get(stat, 'value'));
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
    update: attemptSaveable(async ({ baseValue, ...statUpdates }) => {
//       const promises = [];
//       if (baseValue !== statWithValue.baseValue) {
//         promises.push(updateValue(baseValue));
//       }
// 
//       promises.push(update(statUpdates));
// 
//       await Promise.all(promises);
    }),
    create: attemptSaveable(async (statToCreate) => {
      console.log({
        name: statToCreate.name,
        values: [{
          key: 'value',
          value: statToCreate.baseValue,
        }],
        dumbValues: { notes: '', type: statToCreate.type }
      });
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
    characterId,
    typeId,
    characterWidgets,
    setCharacterWidgets,
    updateDumbValue,
    stat,
    statWithValue,
    setStat,
    saving,
    updateValue,
    smartValue.value,
    id,
    addToPage,
    attemptSaveable,
    remove,
    update,
  ]);
}

export default useStat;
