import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
} from '@material-ui/core';
import EditContainer from './EditContainer';
import Markdown from './Markdown';

const useStyles = makeStyles(theme => ({

}));

function MarkdownInput({
  onCancel,
  onSave,
  value,
}) {
  const classes = useStyles();

  return (
    <EditContainer
      Form={({ newVal, setNewVal }) => (
        <Box p={2}>
          <TextField
            className={classes.textArea}
            fullWidth
            label="Text"
            multiline
            onChange={e => setNewVal(e.target.value)}
            value={newVal || 'This is a link to [google](https://google.com)'}
            variant="filled"
          />
        </Box>
      )}
      Preview={({ newVal }) => (
        <Box p={2}>
          <Markdown text={newVal || 'This is a link to [google](https://google.com)'} />
        </Box>
      )}
      onCancel={onCancel}
      onSave={onSave}
      value={value}
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
