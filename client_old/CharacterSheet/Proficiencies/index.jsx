import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import _filter from 'lodash/filter';
import _last from 'lodash/last';
import _map from 'lodash/map';
import _noop from 'lodash/noop';
import If from '../../utils/If';
import AddButton from '../../Form/AddButton';
import Proficiency from './Proficiency';

function Proficiencies({
  fixedList,
  category,
  attributes,
  onDelete,
  updateCharacter,
}) {
  const [proficiencies, setProficiencies] = useState(attributes[category]);

  useEffect(() => {
    setProficiencies(attributes[category]);
  }, [attributes, category]);

  function save(index, updatedProficiency) {
    const updatedProficiencies = _cloneDeep(proficiencies);

    updatedProficiencies[index] = updatedProficiency;

    updateCharacter({ attributes: { [category]: updatedProficiencies } });
  }

  function deleteFunc(index) {
    if (fixedList) {
      return _noop;
    }

    return () => {
      if (attributes[category][index] === undefined) {
        setProficiencies(attributes[category]);

        return;
      }

      const updatedProficiencies = _filter(proficiencies, (p, i) => i !== index);

      updateCharacter({ attributes: { [category]: updatedProficiencies } });
    };
  }

  function addItem() {
    const newProficiency = {
      bonusModifier: 0,
      name: '',
      notes: '',
      proficient: false,
      type: '',
    };

    setProficiencies([...proficiencies, newProficiency]);
  }

  return (
    <>
      {_map(proficiencies, (proficiency, i) => (
        <Proficiency
          key={proficiency.name}
          attributes={attributes}
          proficiency={proficiency}
          onDelete={deleteFunc(i)}
          onSave={(updatedProficiency) => save(i, updatedProficiency)}
        />
      ))}
      <If conditions={[!fixedList]}>
        <AddButton
          onAdd={addItem}
          BoxProps={{ width: 1, mt: 2 }}
          disabled={!_last(proficiencies).name}
        />
      </If>
    </>
  );
}

Proficiencies.propTypes = {
  fixedList: PropTypes.bool,
  category: PropTypes.string.isRequired,
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

Proficiencies.defaultProps = {
  fixedList: false,
};

export default Proficiencies;
