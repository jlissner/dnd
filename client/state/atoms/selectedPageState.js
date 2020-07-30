import { atom } from 'recoil';

const selectedPageState = atom({
  key: 'selectedPageState',
  default: null,
});

export default selectedPageState;
