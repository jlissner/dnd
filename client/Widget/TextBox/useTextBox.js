import { useRecoilState, useRecoilValue } from 'recoil';
import _find from 'lodash/find';
import { characterWidgetsState, selectedCharacterState, widgetTypesState } from '../../state';
import { createWidget } from '../widgetActions';
import { useMemo } from 'react';
import useWidget from '../useWidget';

function useTextBox(id) {
  const characterId = useRecoilValue(selectedCharacterState);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'TextBox']).idPk;
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    widget: textBox,
    attemptSaveable,
    saving,
    update,
    updateDumbValue,
    remove,
    addToPage,
  } = useWidget(id);

  return useMemo(() => ({
    textBox,
    saving,
    create: attemptSaveable(async (newTextBox) => {
      const createdTextBox = await createWidget({
        name: newTextBox.name,
        characterId,
        widgetTypeId: typeId,
        dumbValues: { text: '', showTitle: newTextBox.showTitle }
      });

      setCharacterWidgets([...characterWidgets, createdTextBox.idPk]);
    }),
    update: (updatedTextBox) => {
      update({
        name: updatedTextBox.name,
        dumbValues: {
          text: textBox.text,
          showTitle: updatedTextBox.showTitle,
        },
      });
    },
    deleteTextBox: remove,
    addToPage,
    saveText: (newText) => {
      if (typeof newText === 'function') {
        updateDumbValue('text', newText(textBox.text))
      } else {
        updateDumbValue('text', newText);
      }
    },
  }), [
    characterId,
    typeId,
    textBox,
    attemptSaveable,
    saving,
    update,
    remove,
    addToPage,
    setCharacterWidgets,
    characterWidgets,
    updateDumbValue,
  ]);
}

export default useTextBox;
