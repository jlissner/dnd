import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditFeature from './EditFeature';
import ViewFeature from './ViewFeature';

function Feature({
  onSave,
  tags,
  name,
  longDesc,
  shortDesc,
  uses,
}) {
  const [editMode, setEditMode] = useState(!Boolean(name));

  if (editMode) {
    return (
      <EditFeature
        setEditMode={setEditMode}
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
    <EditButton onClick={() => setEditMode(true) }>
      <ViewFeature
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
