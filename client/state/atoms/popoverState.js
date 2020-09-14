import { atom } from 'recoil';

const popoverState = atom({
  key: 'popoverState',
  default: {
    anchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    children: '',
  },
});

export default popoverState;
