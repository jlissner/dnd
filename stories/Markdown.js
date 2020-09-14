import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Markdown from '../client/Markdown';

const MarkdownStorybook = ({ text, ...props }) => {
  const [newText, setNewText] = useState(text);

  return  <Markdown text={newText} update={setNewText} {...props} />
};

MarkdownStorybook.propTypes = {
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

MarkdownStorybook.defaultProps = {
  user: null,
};


export default MarkdownStorybook;
