import { selectorFamily, waitForAll } from 'recoil';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _sortBy from 'lodash/sortBy';
import _toNumber from 'lodash/toNumber';
import { smartValueState, smartValueModifierState } from '../atoms';

const smartValueSelector = selectorFamily({
  key: 'smartValueSelector',
  get: (smartValueId) => ({ get }) => {
    const smartValue = get(smartValueState(smartValueId));

    if (!smartValue) {
      return { smartValueId, deleted: true };
    }

    const baseValue = smartValue.value;
    const numericBaseValue = _toNumber(baseValue);
    const isText = baseValue === '' || isNaN(numericBaseValue);
    const smartValueModifiers = get(waitForAll(_map(smartValue.modifiers, smartValueModifierState)));
    const sortedModifiers = _sortBy(smartValueModifiers, ({ listOrder }) => parseInt(listOrder));
    const modifiersWithRefValues = _map(sortedModifiers, ({ smartValueRefFk, ...modifier }) => {
      const smartValueRef = get(smartValueSelector(smartValueRefFk));

      return {
        ...modifier,
        smartValueRef,
      };
    });

    if (isText) {
      return {
        ...smartValue,
        isText,
      };
    }

    const augmentations = [];
    const numericValueWithMods = _reduce(modifiersWithRefValues, (res, smartValueModifier) => {
      const refValue = smartValueModifier.smartValueRef.value;

      if (!smartValueModifier.active) {
        return res;
      }

      switch (smartValueModifier.type) {
        case 'ATTR_MOD': {
          const modValue = Math.floor((refValue - 10) / 2);

          return res + modValue;
        }
        case 'BASE': {
          const difference = refValue - numericBaseValue;

          return res + difference;
        }
        case 'AUGMENT': {
          augmentations.push(refValue);

          return res;
        }
        case 'ADD':
        default: {
          return res + refValue;
        }
      }
    }, numericBaseValue);

    return {
      ...smartValue,
      baseValue,
      augmentations,
      isText,
      delta: numericValueWithMods - numericBaseValue,
      value: numericValueWithMods,
      modifications: modifiersWithRefValues,
    };
  }
});

export default smartValueSelector;
