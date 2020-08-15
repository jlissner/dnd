import { atomFamily } from 'recoil';
import { fetchSmartValueModifier } from '../../actions';

const smartValueModifierState = atomFamily({
  key: 'smartValueModifierState',
  default: fetchSmartValueModifier,
});

export default smartValueModifierState;
