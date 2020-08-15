import { getNumericValue } from '../../utils';

export function getChangeType(val) {
  const firstChar = val[0];

  if ((firstChar === '-' || firstChar === '+') && val.length > 1) {
    return 'delta';
  }

  if (isNaN(parseInt(firstChar, 10))) {
    return 'invalid';
  }

  return 'set';
}

export function getModifier(currentVal, newVal, type) {
  if (type === 'delta') {
    return newVal;
  }

  return newVal - currentVal;
}

export function getNewValueInfo(currentVal, newVal) {
  const type = getChangeType(newVal);

  if (type === 'invalid') {
    throw new Error('Value must be a number');
  }

  const parsedCurVal = getNumericValue(currentVal);
  const parsedNewVal = getNumericValue(newVal);
  const modifier = getModifier(parsedCurVal, parsedNewVal, type);

  return {
    newValue: parsedCurVal + modifier,
    modifier,
  };
}