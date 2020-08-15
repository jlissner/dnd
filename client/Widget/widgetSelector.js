import { selectorFamily } from 'recoil';
import _find from 'lodash/find';
import {
  widgetState,
  widgetTypesState,
} from '../state';

const widgetSelector = selectorFamily({
  key: 'widgetSelector',
  get: (id) => ({ get }) => {
    const widgetTypes = get(widgetTypesState);
    const widget = get(widgetState(id));

    if (!widget) {
      return widget;
    }

    const widgetType = _find(widgetTypes, ['idPk', widget.widgetTypeFk]);

    return {
      ...widget,
      ...widget.dumbValues,
      widgetType,
    };
  },
});

export default widgetSelector;
