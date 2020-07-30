import React from 'react';
import {
  Box,
  Paper,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PageSkeleton from './PageSkeleton';

function CharacterBookSkeleton() {
  return (
    <Box component={Paper} height={1}>
      <Box p={2} height={1}>
        <Skeleton variant="text" width="20%"/>

        <Box pt={2} height={1}>
          <PageSkeleton />
        </Box>
      </Box>  
    </Box>
  )
}

export default CharacterBookSkeleton;
