import { atomFamily } from 'recoil';
import _get from 'lodash/get';
import widgets from '../../Widget/widgets';

const userWidgetsState = atomFamily({
  key: 'userWidgetsState',
  default: async ({ userId, widgetType }) => {
    const fetchWidgets = _get(widgets, `${widgetType}.byUser`);

    if (fetchWidgets && userId) {
      return fetchWidgets(userId);
    }

    return [];
  },
});

export default userWidgetsState;
