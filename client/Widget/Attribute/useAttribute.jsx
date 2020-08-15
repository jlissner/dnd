import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import _find from 'lodash/find';
import {
  characterWidgetsState,
  selectedCharacterState,
  widgetTypesState,
} from '../../state';
import { useSmartValue } from '../../hooks/';
import { createWidget } from '../widgetActions';
import useWidget from '../useWidget';

function useAttribute(id) {
  const characterId = useRecoilValue(selectedCharacterState);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'Attribute']).idPk;
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    widget: characterAttribute,
    saving,
    update,
    updateDumbValue,
    remove,
    addToPage,
    attemptSaveable,
  } = useWidget(id);
  const {
    value,
    modifier: modFk,
    name,
    abbr,
    notes,
  } = characterAttribute || {};
  const { smartValue: attribute, updateValue } = useSmartValue(value);
  const { smartValue: modifier } = useSmartValue(modFk);

  return useMemo(() => ({
    attribute: {
      ...attribute,
      name,
      abbr,
    },
    modifier: {
      ...modifier,
      name: `${name} Modifier`,
      abbr: `${abbr} MOD`,
    },
    saving,
    deleteAttribute: remove,
    updateValue,
    create: attemptSaveable(async (newAttribute) => {
      const createdWidget = await createWidget({
        name: newAttribute.name,
        values: [{
          key: 'value',
          value: newAttribute.value,
        }, {
          key: 'modifier',
          value: 0,
          modifiers: [{
            type: 'ATTR_MOD',
            active: true,
            smartValueRefFk: 'value',
          }],
        }],
        characterId,
        widgetTypeId: typeId,
        dumbValues: { notes: '', abbr: newAttribute.abbr },
      });

      setCharacterWidgets([...characterWidgets, createdWidget.idPk]);
    }),
    updateNotes: (newNotes) => {
      if (newNotes === notes) {
        return;
      }

      updateDumbValue('notes', newNotes);
    },
    update: (updates) => {
      if (updates.value !== attribute.baseValue) {
        updateValue(updates.value);
      }

      update({
        name: updates.name,
        dumbValues: { notes, abbr: updates.abbr }
      });
    },
    notes,
    addToPage,
  }), [
    attemptSaveable,
    attribute,
    characterId,
    typeId,
    characterWidgets,
    setCharacterWidgets,
    update,
    remove,
    modifier,
    saving,
    updateValue,
    name,
    abbr,
    notes,
    addToPage,
    updateDumbValue,
  ]);
}

export default useAttribute;
