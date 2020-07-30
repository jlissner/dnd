import { selectorFamily } from 'recoil';
import _pick from 'lodash/pick';
import { pageLayoutState, widgetState } from '../atoms';

const pageLayoutSelector = selectorFamily({
  key: 'pageLayoutSelector',
  get: (pageLayoutId) => ({ get }) => {
    const layoutData = get(pageLayoutState(pageLayoutId));
    const widget = get(widgetState(_pick(layoutData, ['type', 'widgetId'])));

    return {
      ...layoutData,
      widget,
    };
  }
});

export default pageLayoutSelector;
