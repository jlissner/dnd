import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _map from 'lodash/map';
import {
  removeByIndex,
  replaceByIndex,
} from '../../utils';
import AddButton from '../../Form/AddButton';
import AdvancedTextSection from '../AdvancedTextSection';
import Currency from './Currency';

const NEW_EQUIPMENT_TEMPLATE = {
  name: '',
  uses: [],
  shortDesc: '',
  longDesc: '',
  tags: [],
};

function Equipment({
  attributes,
  updateCharacter,
}) {
  const { equipment, money } = attributes;
  const [newEquipment, setNewEquipment] = useState(equipment);
  const addButtonDisabled = newEquipment.length > 0 ? !_last(newEquipment).name : false;

  useEffect(() => {
    setNewEquipment(equipment);
  }, [equipment])

  function onAdd() {
    setNewEquipment([...newEquipment, NEW_EQUIPMENT_TEMPLATE]);
  }

  function onDelete(index) {
    const updatedEquipment = removeByIndex(newEquipment, index);

    if (_isEqual(updatedEquipment, equipment)) {
      setNewEquipment([...updatedEquipment])
    } else {
      updateCharacter({ attributes: { equipment: updatedEquipment } });
    }
  }

  function onSave(updatedItem, index) {
    const updatedEquipment = replaceByIndex(newEquipment, updatedItem, index);

    updateCharacter({ attributes: { equipment: updatedEquipment } });
  }

  return (
    <Box
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      p={2}
    >
      <Grid container spacing={1} wrap="nowrap">
        <Box width={100} ml={-2.5}>
          <Currency money={money} updateCharacter={updateCharacter} />
        </Box>
        <Box pl={2}>
          {_map(newEquipment, (equip, i) => (
            <Box key={equip.name} pb={1}>
              <AdvancedTextSection
                onDelete={() => onDelete(i)}
                onSave={(newItem) => onSave(newItem, i)}
                {...equip}
              />
            </Box>
          ))}
          <AddButton disabled={addButtonDisabled} onAdd={onAdd} />
        </Box>
      </Grid>
      <Box
        bgcolor="rgba(0, 0, 0, 0.09)"
        borderTop={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        mx={-2}
        mb={-2}
        mt={2}
        p={2}
      >
        <Typography align="center" variant="h6">Equipment</Typography>
      </Box>
    </Box>
  )
}

Equipment.propTypes = {
  attributes: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Equipment;
