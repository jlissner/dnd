import _isNaN from 'lodash/isNaN';

function getNumericValue(text, defaultValue = 0) {
  const textToParse = text[0] === '0' && text.length > 1 ? text.substring(1) : text;
  
  if (textToParse === '-') {
    return textToParse;
  }

  const value = parseInt(text, 10);

  return _isNaN(value) ? defaultValue : value;
}

export default getNumericValue;
