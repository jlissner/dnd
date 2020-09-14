import _get from 'lodash/get';

function parseCheckbox(update, text) {
  let instanceCount = 0;

  function locateCheckbox(value, fromIndex) {
    return value.indexOf('{', fromIndex)
  }

  function tokenizeCheckbox(eat, value, silent) {
    const match = /^\[(\s|x|X)?\]/.exec(value);

    if (match) {
      const curCount = instanceCount;
      const checked = Boolean(_get(match, '[1]', '').trim());
      
      instanceCount += 1;
      
      if (silent) {
        return true
      }

      return eat(match[0])({
        type: 'checkbox',
        checked,
        onClick: () => {
          let i = -1;

          update((text) => {
            const newText = text.replace(/\[(\s|x|X)?\]/g, (instance, x) => {
              i += 1;

              if (i === curCount) {
                return checked ? '[]' : '[x]';
              } else {
                return instance;
              }
            });

            return newText;
          });
        },
      });
    }
  }

  tokenizeCheckbox.notInLink = true;
  tokenizeCheckbox.locator = locateCheckbox;

  return function checkboxes() {
    var Parser = this.Parser
    var tokenizers = Parser.prototype.inlineTokenizers
    var methods = Parser.prototype.inlineMethods
    Parser.prototype.options.gfm = false;

    // Add an inline tokenizer
    tokenizers.checkbox = tokenizeCheckbox
    
    // Do first
    methods.splice(0, 0, 'checkbox');
  }
}

export default parseCheckbox;
