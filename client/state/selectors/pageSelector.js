import { selectorFamily, waitForAll } from 'recoil';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { pageState } from '../atoms';
import { pageLayoutState } from '../index';

const pageSelector = selectorFamily({
  key: 'pageSelector',
  get: (pageId) => ({ get }) => {
    const pageData = get(pageState(pageId));
    const layout = get(waitForAll(_map(_get(pageData, 'layout'), pageLayoutState)));

    return {
      ...pageData,
      layout,
    };
  }
});

export default pageSelector;
