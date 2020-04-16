import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
} from '@material-ui/core';
import _isEqual from 'lodash/isEqual';
import _noop from 'lodash/noop';
import EditorBody from './EditorBody';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';

function EditorWrapper({
  bgcolor,
  children,
  onCancel,
  onDelete,
  onSave,
  originalValue,
  Preview,
  form,
  setValidatedForm,
  validate,
  value,
  width,
}) {
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const showOverlay = saving || deleting;
  const saveDisabled = _isEqual(originalValue, value);
  const overlay = showOverlay
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
    if (saving && saveDisabled) {
      onCancel();
    }
  }, [onCancel, saving, saveDisabled]);

  function handleSave() {
    const { hasError, validatedSchema } = validate(form, value);

    if (hasError) {
      setValidatedForm(validatedSchema);
      return;
    }

    setSaving(true);
    onSave(value);
  }

  function handleDelete() {
    setDeleting(true);
    onDelete();
  }

  return (
    <Box
      bgcolor={bgcolor}
      border={1}
      borderColor="grey.500"
      borderRadius={4}
      position="relative"
      width={width}
      zIndex={100}
    >
      {overlay}
      <EditorHeader onCancel={onCancel} previewing={previewing} setPreviewing={setPreviewing} />
      <EditorBody children={children} Preview={Preview} previewing={previewing} value={value} />
      <EditorFooter
        saveDisabled={saveDisabled}
        handleSave={handleSave}
        handleDelete={handleDelete}
        showDelete={onDelete !== _noop}
      />
    </Box>
  )
}

EditorWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  bgcolor: PropTypes.string,
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  Preview: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
  setValidatedForm: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  originalValue: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  width: PropTypes.number,
};

EditorWrapper.defaultProps = {
  bgcolor: 'transparent',
  onDelete: _noop,
  width: 1,
};

export default EditorWrapper;
