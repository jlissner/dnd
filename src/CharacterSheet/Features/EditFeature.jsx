import React from 'react';
import PropTypes from 'prop-types';
import EditContainer from '../../Form/EditContainer';
import FeatureForm from './FeatureForm';
import AdvancedTextSection from '../AdvancedTextSection';

function EditFeature({
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
      Form={FeatureForm}
      Preview={({ newVal }) => <AdvancedTextSection {...newVal} />}
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
      value={value}
    />
  );
}

EditFeature.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

EditFeature.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default EditFeature;
