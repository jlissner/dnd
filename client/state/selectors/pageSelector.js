import { selectorFamily, waitForAll } from 'recoil';
import _map from 'lodash/map';
import { pageState } from '../atoms';
import pageLayoutSelector from './pageLayoutSelector';

const pageSelector = selectorFamily({
  key: 'pageSelector',
  get: (pageId) => ({ get }) => {
    const pageData = get(pageState(pageId));
    const layout = get(waitForAll(_map(pageData.layout, (idPk) => pageLayoutSelector(idPk))));

    return {
      ...pageData,
      layout,
    };
  }
});

export default pageSelector;
