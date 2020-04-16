import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Editor from '../Editor';
import Markdown from '../Displays/Markdown';

function MarkdownInput({
  onCancel,
  onSave,
  value,
}) {

  return (
    <Editor
      form={[{
        accessor: 'text',
        defaultValue: 'This is a link to [google](https://google.com)',
        type: 'multiline',
      }]}
      Preview={({ newVal }) => (
        <Box p={2}>
          <Markdown text={newVal.text} />
        </Box>
      )}
      onCancel={onCancel}
      onSave={onSave}
      value={{ text: value}}
    />
  );
}

MarkdownInput.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

MarkdownInput.defaultProps = {
  onCancel: null,
};

export default MarkdownInput
