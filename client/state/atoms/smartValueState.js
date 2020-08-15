import { atomFamily } from 'recoil';
import { fetchSmartValue } from '../../actions';

const smartValueState = atomFamily({
  key: 'smartValueState',
  default: fetchSmartValue,
});

export default smartValueState;
