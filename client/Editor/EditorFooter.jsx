import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import DeleteButton from '../Form/DeleteButton';
import { If, Fa } from '../utils';

function EditorFooter({
  handleSave,
  handleDelete,
  saveDisabled,
  showDelete,
}) {
  return (
    <Box
      bgcolor="grey.300"
      borderTop={1}
      borderColor="grey.500"
      borderRadius="0 0 4px 4px"
      display="flex"
      justifyContent="space-between"
    >
      <ButtonGroup variant="text">
        <Button disabled={saveDisabled} onClick={handleSave}>
          <Fa icon="save" />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="text">
        <If conditions={[showDelete]}>
          <DeleteButton onClick={handleDelete}/>
        </If>
      </ButtonGroup>
    </Box>
  );
}

EditorFooter.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
};

export default EditorFooter;
