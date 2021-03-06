import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Editor from '../../Editor';
import advancedTextSectionForm from './advancedTextSectionForm';
import ViewAdvancedTextSection from './ViewAdvancedTextSection';

function EditAdvancedTextSection({
  onCancel,
  onDelete,
  onSave,
  tags,
  name,
  longDesc,
  shortDesc,
  uses,
}) {
  const value = {
    tags,
    name,
    longDesc,
    shortDesc,
    uses,
  }

  return (
    <Box bgcolor="background.paper" borderRadius={4} > 
      <Editor
        form={advancedTextSectionForm}
        Preview={({ newVal }) => <ViewAdvancedTextSection {...newVal} />}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        value={value}
      />
    </Box>
  );
}

EditAdvancedTextSection.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

EditAdvancedTextSection.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default EditAdvancedTextSection;
