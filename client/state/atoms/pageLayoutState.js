import { atomFamily } from 'recoil';
import { fetchPageLayout } from '../../actions';

const pageLayoutState = atomFamily({
  key: 'pageLayoutState',
  default: fetchPageLayout,
});

export default pageLayoutState;
