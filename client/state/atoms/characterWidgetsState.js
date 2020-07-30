import { atomFamily } from 'recoil';
import _get from 'lodash/get';
import widgets from '../../Widget/widgets';

const characterWidgetsState = atomFamily({
  key: 'characterWidgetsState',
  default: async ({ characterId, widgetType }) => {
    const fetchWidgets = _get(widgets, `${widgetType}.byCharacter`);

    if (fetchWidgets && characterId) {
      return fetchWidgets(characterId);
    }

    return [];
  },
});

export default characterWidgetsState;
