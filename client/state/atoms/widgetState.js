import { atomFamily } from 'recoil';
import widgets from '../../Widget/widgets';

const widgetState = atomFamily({
  key: 'widgetState',
  default: ({ type, widgetId }) => widgets[type].fetch(widgetId),
});

export default widgetState;
