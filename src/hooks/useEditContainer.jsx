import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
} from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Code as CodeIcon,
  Help as InfoIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import _isEqual from 'lodash/isEqual';
import If from '../utils/If';

function MarkdownInput({
  onCancel,
  onSave,
  value,
}) {
  const [newVal, setNewVal] = useState(value);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveDisabled = _isEqual(newVal, value);
  const overlay = saving
    ? <Box
        bgcolor="rgba(0, 0, 0, .25)"
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    : null;

  useEffect(() => {
    setSaving(false);
  }, [value]);

  function save(newVal) {
    setSaving(true);
    onSave(newVal);
  }

  const editContainer = ({ form, preview }) => (
    <Box border={1} borderColor="grey.500" borderRadius={4} position="relative">
      {overlay}
      <Box
        bgcolor="grey.300"
        borderBottom={1}
        borderColor="grey.500"
        display="flex"
        justifyContent="space-between"
      >
        <ButtonGroup variant="text">
          <Button disabled={!previewing} onClick={() => setPreviewing(false)}>
            <CodeIcon />
          </Button>
          <Button disabled={previewing} onClick={() => setPreviewing(true)}>
            <VisibilityIcon />
          </Button>
        </ButtonGroup>
        
        <If conditions={[Boolean(onCancel)]}>
          <ButtonGroup variant="text">
            <Button onClick={onCancel}>
              <CancelIcon />
            </Button>
          </ButtonGroup>
        </If>
      </Box>
      
      {previewing ? preview : form}

      <Box
        bgcolor="grey.300"
        borderTop={1}
        borderColor="grey.500"
        display="flex"
        justifyContent="space-between"
      >
        <ButtonGroup variant="text">
          <Button disabled={saveDisabled} onClick={() => setNewVal(value)}>
            <RefreshIcon />
          </Button>
          <Button disabled={saveDisabled} onClick={() => save(newVal)}>
            <SaveIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="text">
          <Button onClick={() => alert('Learn how to write markdown here: https://www.google.com/search?client=firefox-b-1-d&q=how+to+write+markdown')}>
            <InfoIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );

  return [editContainer, newVal, setNewVal];
}

MarkdownInput.propTypes = {
  form: PropTypes.node.isRequired,
  preview: PropTypes.node.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

MarkdownInput.defaultProps = {
  onCancel: null,
};

export default MarkdownInput
