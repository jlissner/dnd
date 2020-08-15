import { atomFamily } from 'recoil';
import { fetchWidget } from '../../Widget/widgetActions';

const widgetState = atomFamily({
  key: 'widgetState',
  default: fetchWidget,
});

export default widgetState;
