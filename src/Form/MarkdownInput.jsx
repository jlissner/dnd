import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
} from '@material-ui/core';
import Markdown from './Markdown';
import useEditContainer from '../hooks/useEditContainer';

const useStyles = makeStyles(theme => ({
  textArea: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
}));

function MarkdownInput({
  onCancel,
  onSave,
  value,
}) {
  const classes = useStyles();
  const [editContainer, newVal, setNewVal] = useEditContainer({
    onCancel: onCancel,
    onSave: onSave,
    value,
  });
  const renderValue = newVal || 'This is a link to [google](https://google.com)';

  return editContainer({
    form: (
      <Box pb={1} key="form">
        <TextField
          className={classes.textArea}
          fullWidth
          multiline
          onChange={e => setNewVal(e.target.value)}
          value={renderValue}
          variant="outlined"
        />
      </Box>
    ),
    preview: <Box p={2} key="preview"><Markdown text={renderValue} /></Box>,
  });
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
