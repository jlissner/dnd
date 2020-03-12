import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
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
    <EditContainer
      form={advancedTextSectionForm}
      Preview={({ newVal }) => <ViewAdvancedTextSection {...newVal} />}
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
      value={value}
    />
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
