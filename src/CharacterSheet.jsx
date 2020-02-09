import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
} from '@materal-ui/core';
import useCharacter from './hooks/useCharacter';

function CharacterSheet({ id }) {
  const character = useCharacter(id);

  return (
    <form>
      Hello World
    </form>
  )
}

CharacterSheet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterSheet;
