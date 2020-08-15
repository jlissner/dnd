import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function SkillSkeleton() {
  return (
    <Box display="flex">
      <Box pr={2}>
        <Skeleton width={32} />
      </Box>
      <Skeleton width="100%" />
    </Box>
  )
}

export default SkillSkeleton;
