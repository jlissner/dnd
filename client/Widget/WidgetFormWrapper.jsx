import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
} from '@material-ui/core';

function WidgetFormWrapper({
  children,
  hasChanges,
  handleAddToPage,
  handleDelete,
  handleSave,
  reset,
  id,
  saving,
}) {
  return (
    <Box width={1}>
      <Box pb={2}>
        {children}
      </Box>
      <Divider />
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Box display={id ? 'block' : 'none'} mr="auto">
          <Button
            disabled={saving}
            onClick={handleDelete}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
        <Box mr={1}>
          <Button
            color="primary"
            disabled={saving || !hasChanges}
            onClick={async (widget) => {
              await handleSave(widget);

              if (!id) {
                reset();
              }
            }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
        <Box display={id ? 'block' : 'none'}>
          <Button
            color="primary"
            disabled={saving}
            onClick={handleAddToPage}
            variant="contained"
          >
            Add to Page
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

WidgetFormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  handleAddToPage: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  id: PropTypes.string,
};

WidgetFormWrapper.defaultProps = {
  id: '',
};

export default WidgetFormWrapper;
