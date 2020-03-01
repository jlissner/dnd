import React, { useEffect, useMemo, useState } from 'react';
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
import _noop from 'lodash/noop';
import If from '../utils/If';
import DeleteButton from './DeleteButton';

function EditContainer({
  onCancel,
  onDelete,
  onSave,
  Preview,
  Form,
  value,
}) {
  const [newVal, setNewVal] = useState(value);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const Content = useMemo(() => (previewing ? Preview : Form), [Form, Preview, previewing]);
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
        zIndex={1}
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

  return (
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
          <Button onClick={() => alert('Learn how to write markdown here: https://www.google.com/search?client=firefox-b-1-d&q=how+to+write+markdown')}>
            <InfoIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="text">
          <Button onClick={onCancel}>
            <CancelIcon />
          </Button>
        </ButtonGroup>
      </Box>

      <Content setNewVal={setNewVal} newVal={newVal} />

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
          <If conditions={[onDelete === _noop]}>
            <DeleteButton onClick={onDelete}/>
          </If>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

EditContainer.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  Preview: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
  Form: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
};

EditContainer.defaultProps = {
  onDelete: _noop,
};

export default EditContainer;
