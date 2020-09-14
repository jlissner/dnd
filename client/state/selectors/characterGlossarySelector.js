import { selector } from 'recoil';
import _find from 'lodash/find';
import {
  selectedCharacterState,
  widgetTypesState,
  characterWidgetsState,
} from '../atoms';

const characterGlossarySelector = selector({
  key: 'characterGlossarySelector',
  get: ({ get }) => {
    const selectedCharacter = get(selectedCharacterState);
    const widgetTypes = get(widgetTypesState);
    const { idPk } = _find(widgetTypes, ['name', 'Glossary']);
    const characterGlossaryWidgets = get(characterWidgetsState({ characterId: selectedCharacter, typeId: idPk }));

    return characterGlossaryWidgets[0];
  },
});

export default characterGlossarySelector;
