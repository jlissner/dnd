import _map from 'lodash/map';
import _toLower from 'lodash/toLower';
import widgets from '../Widget/widgets';

function parseWidgetValue() {
  return _map(widgets, ({ type }) => {
    function locateWidgetValue(value, fromIndex) {
      return _toLower(`{${value}:`).indexOf(_toLower(type), fromIndex);
    }

    function tokenizeWidgetValue(eat, value, silent) {
      const match = new RegExp(`{${_toLower(type)}:(([a-zA-Z]|[0-9]|.)*)}`).exec(value);

      if (!match) {
        return;
      }

      if (silent) {
        return true
      }

      return eat(match[0])({
        type: 'widgetValue',
        widgetType: type,
        valuePath: match[1],
      });
    }

    tokenizeWidgetValue.notInLink = true
    tokenizeWidgetValue.locator = locateWidgetValue

    return function widgetValue() {
      var Parser = this.Parser
      var tokenizers = Parser.prototype.inlineTokenizers
      var methods = Parser.prototype.inlineMethods

      // Add an inline tokenizer (defined in the following example).
      tokenizers[`widgetValue${type}`] = tokenizeWidgetValue

      // Run it just before `text`.
      methods.splice(methods.indexOf('text'), 0, `widgetValue${type}`)
    }

  });
}

export default parseWidgetValue;