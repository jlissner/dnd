import { atomFamily } from 'recoil';
import { fetchPage } from '../../actions';

const pageState = atomFamily({
  key: 'pageState',
  default: fetchPage,
});

export default pageState;
