import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function PageSkeleton() {
  return (
    <Box p={1} height={1} display="flex">
      <Box width="50%" height={1} p={1}>        
        <Skeleton variant="rect" width="100%" height="100%" />
      </Box>
      <Box width="50%" height={1} p={1}>        
        <Skeleton variant="rect" width="100%" height="100%" />
      </Box>
    </Box>
  );
}

export default PageSkeleton;
