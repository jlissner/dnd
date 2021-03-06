import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Link,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';

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

const Blockquote = withStyles((theme) => ({
  root: {
    borderLeft: '4px solid rgba(0, 0, 0, 0.23)',
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
}))(({ children, classes }) => <Typography className={classes.root} component="blockquote">{children}</Typography>);

const InlineCode = withStyles((theme) => ({
  root: {
    background: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(0.5),
    padding: 2,
    color: theme.palette.primary.main,
  },
}))(({ children, classes }) => <code className={classes.root}>{children}</code>);

const useCodeStyles = makeStyles((theme) => ({
  root: {
    background: ({ language }) => language === 'plain' ? 'none' : theme.palette.secondary.light,
    border: ({ language }) => language === 'plain' ? 'none' : `1px solid ${theme.palette.primary.main}`,
    borderRadius: ({ language }) => language === 'plain' ? 0 : theme.spacing(0.5),
    padding: ({ language }) => language === 'plain' ? 0 : theme.spacing(1),
    color: ({ language }) => language === 'plain' ? 'inherit' : theme.palette.primary.main,
  },
}));

function Code({ language, value }) {
  const classes = useCodeStyles({ language });

  return <pre className={classes.root}><code>{value}</code></pre>
}

function Markdown({
  defaultText,
  text,
  ...props
}) {
  return (
    <ReactMarkdown
      renderers={{
        dictionary: ({ children, definition }) => <strong title={definition}>{children}</strong>,
        smartValue: ({ children }) => <div>{children} and it's custom!</div>,
        blockquote: Blockquote,
        code: Code,
        heading: ({ children, level }) => <Typography variant={`h${level}`}>{children}</Typography>,
        inlineCode: InlineCode,
        link: ({ children, href }) => <Link color="primary" href={href} size="small">{children}</Link>,
        paragraph: ({ children }) => <Typography gutterBottom>{children}</Typography>,
        table: ({ children, ...props }) => <Table>{children}</Table>,
        tableHead: ({ children, ...props }) => <TableHead>{children}</TableHead>,
        tableBody: ({ children, ...props }) => <TableBody>{children}</TableBody>,
        tableRow: ({ children, ...props }) => <TableRow hover>{children}</TableRow>,
        tableCell: ({ children, isHeader, align, ...props }) => <TableCell align={align || 'inherit'} variant={isHeader ? 'head' : 'body'}>{children}</TableCell>,
        thematicBreak: Divider,
        definition: (props) => console.log(props) || 'here',
      }}
      source={text || defaultText}
      plugins={[parseHandlebars(), ...parseDictonary([
        { word: 'just', definition: 'crazy cool test'},
        { word: 'test', definition: 'more testing'},
        { word: 'a', definition: 'more testing'},
        { word: 'a big oof', definition: 'more testing'},
        ])]}
      {...props}
    />
  );
}

Markdown.propTypes = {
  defaultText: PropTypes.string,
  text: PropTypes.string,
};

Markdown.defaultProps = {
  defaultText: '',
  text: '',
};

export default Markdown;
