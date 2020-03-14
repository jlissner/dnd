import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@material-ui/core';
import _reduce from 'lodash/reduce';
import { Simple } from '../../Displays';

function calculateSpeed({ speed, ...character }) {
  const { base, modifiers } = speed;
  const bonusModifiers = _reduce(modifiers, (res, { active, value }) => (active ? res + value : res), 0)

  return base + bonusModifiers;
}

function ViewSpeed({
  character,
}) {
  const { speed } = character;
  const { notes } = speed;
  const totalSpeed = calculateSpeed(character);

  return (
    <Simple label="Speed" notes={notes}>
      <Box p={1} align="center" component={Typography}>
        {totalSpeed}
      </Box>
    </Simple>
  )
}

ViewSpeed.propTypes = {
  character: PropTypes.shape().isRequired,
};

export default ViewSpeed;
