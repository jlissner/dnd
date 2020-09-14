// This is an example of how to create a standard tokenizer
// see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#parserblocktokenizers
// for more details

function parseHandlebars() {
  function locateHandlebar(value, fromIndex) {
    return value.indexOf('{{', fromIndex)
  }

  function tokenizeDictionary(eat, value, silent) {
    var match = /^{{(\w+)}}/.exec(value)

    if (match) {
      if (silent) {
        return true
      }

      console.log({ value, match });

      return eat(match[0])({
        type: 'smartValue',
        url: 'https://social-network/' + match[1],
        children: [{type: 'text', value: match[1]}]
      })
    }
  }

  tokenizeDictionary.notInLink = true
  tokenizeDictionary.locator = locateHandlebar

  return function handlebars() {
    var Parser = this.Parser
    var tokenizers = Parser.prototype.inlineTokenizers
    var methods = Parser.prototype.inlineMethods

    // Add an inline tokenizer (defined in the following example).
    tokenizers.handlebar = tokenizeDictionary

    // Run it just before `text`.
    methods.splice(methods.indexOf('text'), 0, 'handlebar')
  }
}