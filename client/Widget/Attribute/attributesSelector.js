import { selector, waitForAll } from 'recoil';
import _find from 'lodash/find';
import _map from 'lodash/map';
import {
  selectedCharacterState,
  characterWidgetsState,
  widgetState,
  widgetTypesState,
} from '../../state';

const attributesSelector = selector({
  key: 'attributesSelector',
  get: ({ get }) => {
    const widgetTypes = get(widgetTypesState);
    const widgetType = _find(widgetTypes, ['name', 'Attribute']);
    const selectedCharacter = get(selectedCharacterState);
    const characterAttributes = get(characterWidgetsState({
      characterId: selectedCharacter,
      typeId: widgetType.idPk,
    }));

    return get(waitForAll(_map(characterAttributes, widgetState)));
  }
});

export default attributesSelector;
