import React from 'react';
import {
  Box,
  Divider,
  Paper
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function GlossarySkeleton() {
  return (
    <Paper>
      <Box p={2}>
        <Skeleton />        
      </Box>
      <Divider />
      <Box p={2}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </Paper>
  )
}

export default GlossarySkeleton;
