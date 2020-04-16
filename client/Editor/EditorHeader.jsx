import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { useGlobalState } from '../hooks';
import { Fa } from '../utils';

function EditorHeader({
  onCancel,
  previewing,
  setPreviewing,
}) {
  const [, setMarkdownHelperOpen] = useGlobalState('markdownHelperOpen');

  return (
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
  )
}

EditorHeader.propTypes = {
  onCancel: PropTypes.func.isRequired,
  previewing: PropTypes.bool.isRequired,
  setPreviewing: PropTypes.func.isRequired,
};

export default EditorHeader;
