import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
} from '@material-ui/core';
import _isEqual from 'lodash/isEqual';
import _noop from 'lodash/noop';
import { useGlobalState } from '../hooks';
import { If, Fa, validate }  from '../utils';
import DeleteButton from './DeleteButton';
import Form from './index';

function EditContainer({
  bgcolor,
  onCancel,
  onDelete,
  onSave,
  Preview,
  form,
  value,
  width,
}) {
  const [, setMarkdownHelperOpen] = useGlobalState('markdownHelperOpen');
  const [validatedForm, setValidatedForm] = useState(form);
  const [newVal, setNewVal] = useState(value);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const content = useMemo(() => {
    if (previewing) {
      return <Preview newVal={newVal} />
    }

    return <Form form={validatedForm} setValue={setNewVal} value={newVal} />
  }, [validatedForm, newVal, setNewVal, previewing]);
  const saveDisabled = _isEqual(newVal, value);
  const overlay = (saving || deleting)
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

  function save(newVal) {
    const { hasError, validatedSchema } = validate(form, newVal);

    if (hasError) {
      setValidatedForm(validatedSchema);
      return;
    }

    setSaving(true);
    onSave(newVal);
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
      <Box
        bgcolor="grey.300"
        borderBottom={1}
        borderColor="grey.500"
        borderRadius="4px 4px 0 0"
        display="flex"
        justifyContent="space-between"
      >
        <ButtonGroup variant="text">
          <Button disabled={!previewing} onClick={() => setPreviewing(false)}>
            <Fa icon="code" />
          </Button>
          <Button disabled={previewing} onClick={() => setPreviewing(true)}>
            <Fa icon="eye" />
          </Button>
          <Button onClick={() => setMarkdownHelperOpen(true)}>
            <Fa icon="info-circle" />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="text">
          <Button onClick={onCancel}>
            <Fa icon="times" />
          </Button>
        </ButtonGroup>
      </Box>

      {content}

      <Box
        bgcolor="grey.300"
        borderTop={1}
        borderColor="grey.500"
        borderRadius="0 0 4px 4px"
        display="flex"
        justifyContent="space-between"
      >
        <ButtonGroup variant="text">
          <Button disabled={saveDisabled} onClick={() => setNewVal(value)}>
            <Fa icon="sync" />
          </Button>
          <Button disabled={saveDisabled} onClick={() => save(newVal)}>
            <Fa icon="save" />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="text">
          <If conditions={[onDelete !== _noop]}>
            <DeleteButton onClick={handleDelete}/>
          </If>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

EditContainer.propTypes = {
  bgcolor: PropTypes.string,
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  Preview: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  width: PropTypes.number,
};

EditContainer.defaultProps = {
  bgcolor: 'transparent',
  onDelete: _noop,
  width: 1,
};

export default EditContainer;
