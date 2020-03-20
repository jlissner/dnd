import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import AddButton from '../../Form/AddButton';
import AdvancedTextSection from '../AdvancedTextSection';
import Currency from './Currency';

function Equipment({
  character,
  updateCharacter,
}) {
  const { equipment, money } = character;

  function onDelete() {
    alert('delete me');
  }

  function onSave() {
    alert('save me');
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
          {_map(equipment, (equip) => (
            <Box key={equip.name} pb={1}>
              <AdvancedTextSection
                onDelete={onDelete}
                onSave={onSave}
                {...equip}
              />
            </Box>
          ))}
          <AddButton />
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
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Equipment;
