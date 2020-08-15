import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography
} from '@material-ui/core';
import { getNumericPrefix } from '../../utils';
import { useSmartValue } from '../../hooks';
import useWidget from '../useWidget';

function SkillComponent({ handleOpen, id }) {
  const { widget } = useWidget(id);
  const { smartValue } = useSmartValue(widget.value);

  return (
    <Box
      alignItems="center"
      component={Paper}
      display="flex"
      height={1}
      onClick={handleOpen}
      cursor="pointer"
    >
      <Box p={1} component={Typography} fontWeight="bold">
        {getNumericPrefix(smartValue.value)}
        {smartValue.value}
      </Box>
      <Box p={1} pl={0} component={Typography}>{widget.name}</Box>
    </Box>
  )
}

SkillComponent.propTypes = {
  id: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default SkillComponent;
