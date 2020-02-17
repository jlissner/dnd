import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Typography,
} from '@material-ui/core';

function Markdown({
  defaultText,
  text,
  ...props
}) {
  return (
    <ReactMarkdown
      renderers={{
        heading: ({ children, level }) => <Typography variant={`h${level}`}>{children}</Typography>,
        paragraph: ({ children }) => <Typography>{children}</Typography>,
        link: ({ children, href }) => <Button color="primary" href={href} size="small">{children}</Button>,
      }}
      source={text || defaultText}
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
