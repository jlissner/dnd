import { selector, waitForAll } from 'recoil';
import _find from 'lodash/find';
import _map from 'lodash/map';
import {
  selectedCharacterState,
  characterWidgetsState,
  widgetState,
  widgetTypesState,
} from '../../state';

const statsSelector = selector({
  key: 'statsSelector',
  get: ({ get }) => {
    const widgetTypes = get(widgetTypesState);
    const widgetType = _find(widgetTypes, ['name', 'Attribute']);
    const selectedCharacter = get(selectedCharacterState);
    const characterSkills = get(characterWidgetsState({ typeId: widgetType.idPk, characterId: selectedCharacter }));

    return get(waitForAll(_map(characterSkills, (statId) => widgetState(statId))));
  }
});

export default statsSelector;
