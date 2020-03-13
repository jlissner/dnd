import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../Form/EditButton';
import EditArmorClass from './EditArmorClass';
import ViewArmorClass from './ViewArmorClass';

function AdvancedTextSection({
  character,
  updateCharacter,
}) {
  const [editMode, setEditMode] = useState(false);

  function save(ac) {
    updateCharacter({ ac })
  }

  if (editMode) {
    return (
      <EditArmorClass
        onCancel={() => setEditMode(false)}
        onSave={save}
        character={character}
      />
    );
  }

  return (
    <EditButton onClick={() => setEditMode(true)}>
      <ViewArmorClass
        character={character}
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
