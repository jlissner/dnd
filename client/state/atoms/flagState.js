import { atomFamily } from 'recoil';

const flagState = atomFamily({
  key: 'flagState',
  default: false,
});

export default flagState;
