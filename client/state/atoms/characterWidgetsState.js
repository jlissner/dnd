import { atomFamily } from 'recoil';
import { fetchWidgetsByTypeByCharacter } from '../../Widget/widgetActions';

const characterWidgetsState = atomFamily({
  key: 'characterWidgetsState',
  default: async ({ characterId, typeId }) => (
    fetchWidgetsByTypeByCharacter(characterId, typeId)
  ),
});

export default characterWidgetsState;
