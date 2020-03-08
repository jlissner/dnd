import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditAdvancedTextSection from './EditAdvancedTextSection';
import ViewAdvancedTextSection from './ViewAdvancedTextSection';

function AdvancedTextSection({
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
      <EditAdvancedTextSection
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
      <ViewAdvancedTextSection
        tags={tags}
        name={name}
        longDesc={longDesc}
        shortDesc={shortDesc}
        uses={uses}
      />
    </EditButton>
  );
}

AdvancedTextSection.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  longDesc: PropTypes.string,
  shortDesc: PropTypes.string,
  uses: PropTypes.arrayOf(PropTypes.bool),
};

AdvancedTextSection.defaultProps = {
  name: '',
  longDesc: '',
  shortDesc: '',
  tags: [],
  uses: [],
};

export default AdvancedTextSection;
