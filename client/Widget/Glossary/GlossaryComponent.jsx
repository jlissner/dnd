import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import GlossaryWords from './GlossaryWords';
import useGlossary from './useGlossary';

function GlossaryComponent({
  id,
}) {
  const {
    glossary,
    addWord,
  } = useGlossary(id);

  return (
    <Box component={Paper} height={1}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h5">{glossary.name}</Typography>
          </Grid>
          <Grid item>
            search goes here
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box p={2}>
        <GlossaryWords id={id} />
      </Box>
      <Button onClick={addWord} />
    </Box>
  )
}

GlossaryComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GlossaryComponent;
