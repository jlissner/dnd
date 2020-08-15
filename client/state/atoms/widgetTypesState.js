import { atom } from 'recoil';
import { fetchWidgetTypes } from '../../actions';

const wigetTypesState = atom({
  key: 'wigetTypesState',
  default: fetchWidgetTypes(),
});

export default wigetTypesState;
