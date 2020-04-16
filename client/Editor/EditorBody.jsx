import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

function EditorBody({
  Preview,
  previewing,
  children,
  value,
}) {
  if (previewing) {
    return <Preview newVal={value} />;
  }

  return (
    <Box p={2}>
      {children}
    </Box>
  );
}

EditorBody.propTypes = {
  children: PropTypes.node.isRequired,
  Preview: PropTypes.elementType.isRequired,
  previewing: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
};

export default EditorBody;
