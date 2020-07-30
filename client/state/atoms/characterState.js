import { atomFamily } from 'recoil';
import { fetchCharacter } from '../../actions';

const characterState = atomFamily({
  key: 'characterState',
  default: fetchCharacter,
});

export default characterState;
