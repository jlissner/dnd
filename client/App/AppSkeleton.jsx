import React from 'react';
import {
  Box,
} from '@material-ui/core';
import {
  Skeleton,
} from '@material-ui/lab';

function AppSkeleton() {
  return (
    <Box>
      <Skeleton height={64} variant="rect"></Skeleton>
      
      <Box width={800} mx="auto" mt={6}>
        <Skeleton height={300} variant="rect"></Skeleton>
      </Box>
    </Box>
  )
}

export default AppSkeleton;
