import { atomFamily } from 'recoil';

const forceRefreshState = atomFamily({
  key: 'forceRefreshState',
  default: 0,
});

export default forceRefreshState;
