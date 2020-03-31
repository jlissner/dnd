import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
} from '@material-ui/core';
import AddButton from './Form/AddButton';
import { useUser } from './hooks';

function SelectCharacter({
  setSelectedCharacter,
}) {
  const { characters } = useUser();

  return (
    <Box>
      <Paper>
        {JSON.stringify(characters)}
        <AddButton onAdd={() => console.log('add')}/>
      </Paper>
    </Box>
  )
}

SelectCharacter.propTypes = {
  setSelectedCharacter: PropTypes.func.isRequired,
};

export default SelectCharacter;
