import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
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
import _noop from 'lodash/noop';
import useGlossary from '../Widget/Glossary/useGlossary';
import { characterGlossarySelector } from '../state';
import parseCheckbox from './parseCheckbox';
import parseDictionary from './parseDictionary';
import parseWidgetValue from './parseWidgetValue';
import MarkdownBlockquote from './MarkdownBlockquote';
import MarkdownCheckbox from './MarkdownCheckbox';
import MarkdownCodeBlock from './MarkdownCodeBlock';
import MarkdownDictionary from './MarkdownDictionary';
import MarkdownInlineCode from './MarkdownInlineCode';

function Markdown({
  defaultText,
  text,
  update,
  ...props
}) {
  const glossaryId = useRecoilValue(characterGlossarySelector);
  const { glossary } = useGlossary(glossaryId);

  return (
    <ReactMarkdown
      renderers={{
        dictionary: MarkdownDictionary,
        blockquote: MarkdownBlockquote,
        code: MarkdownCodeBlock,
        heading: ({ children, level }) => <Typography variant={`h${level}`}>{children}</Typography>,
        inlineCode: MarkdownInlineCode,
        link: ({ children, href }) => <Link color="primary" href={href} size="small">{children}</Link>,
        paragraph: ({ children }) => <Typography gutterBottom>{children}</Typography>,
        table: Table,
        tableHead: TableHead,
        tableBody: TableBody,
        tableRow: ({ children, ...props }) => <TableRow hover>{children}</TableRow>,
        tableCell: ({ children, isHeader, align, ...props }) => <TableCell align={align || 'inherit'} variant={isHeader ? 'head' : 'body'}>{children}</TableCell>,
        thematicBreak: Divider,
        checkbox: MarkdownCheckbox,
        listItem: ({ children }) => <Typography component="li">{children}</Typography>,
        widgetValue: ({ widgetType, valuePath }) => `${widgetType} - ${valuePath}`
      }}
      source={text || defaultText}
      plugins={[parseCheckbox(update), ...parseDictionary(glossary.words), parseWidgetValue()]}
      {...props}
    />
  );
}

Markdown.propTypes = {
  defaultText: PropTypes.string,
  text: PropTypes.string,
  update: PropTypes.func,
};

Markdown.defaultProps = {
  defaultText: '',
  text: '',
  update: _noop,
};

export default React.memo(Markdown);
