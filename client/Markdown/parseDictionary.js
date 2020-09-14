import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';

function parseDictonary(dictionary) {
  const dictionarySortedByLength = _sortBy(dictionary, ['length']).reverse();

  return _map(dictionarySortedByLength, ({ word, definition }) => {
    function locateWord(value, fromIndex) {
      return value.indexOf(word, fromIndex);
    }

    function tokenizeDictionary(eat, value, silent) {
      const shouldEat = value.indexOf(word) === 0;

      if (!shouldEat) {
        return;
      }

      if (silent) {
        return true
      }

      return eat(word)({
        type: 'dictionary',
        definition,
        children: [{type: 'text', value: word}]
      })
    }

    tokenizeDictionary.notInLink = true
    tokenizeDictionary.locator = locateWord

    return function dictionary() {
      var Parser = this.Parser
      var tokenizers = Parser.prototype.inlineTokenizers
      var methods = Parser.prototype.inlineMethods

      // Add an inline tokenizer (defined in the following example).
      tokenizers[`dictionary${word}`] = tokenizeDictionary

      // Run it just before `text`.
      methods.splice(methods.indexOf('text'), 0, `dictionary${word}`)
    }

  });
}

export default parseDictonary;