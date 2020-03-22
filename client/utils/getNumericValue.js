import _isNaN from 'lodash/isNaN';

function getNumericValue(text, defaultValue = 0) {
  const firstChar = text[0];
  const removeableFirstChar = firstChar === '0' || firstChar === '+';
  const removeFirstChar = removeableFirstChar && text.length > 1;
  const textToParse = removeFirstChar  ? text.substring(1) : text;
  
  if (textToParse === '-' || textToParse === '+') {
    return textToParse;
  }

  const value = parseInt(text, 10);

  return _isNaN(value) ? defaultValue : value;
}

export default getNumericValue;
