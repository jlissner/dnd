import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditFeature from './EditFeature';
import AdvancedTextSection from '../AdvancedTextSection';

function Feature({
  onDelete,
  onSave,
  tags,
  name,
  longDesc,
  shortDesc,
  uses,
}) {
  const [editMode, setEditMode] = useState(!name);

  if (editMode) {
    return (
      <EditFeature
        onCancel={() => setEditMode(false)}
        onDelete={onDelete}
        onSave={onSave}
        tags={tags}
        name={name}
        longDesc={longDesc}
        shortDesc={shortDesc}
        uses={uses}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <AdvancedTextSection
        tags={tags}
        name={name}
        longDesc={longDesc}
        shortDesc={shortDesc}
        uses={uses}
      />
    </EditButton>
  );
}

Feature.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

Feature.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default Feature;
