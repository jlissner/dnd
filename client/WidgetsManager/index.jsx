import React from 'react';
import WidgetsManagerComponent from './WidgetsManagerComponent';
import WidgetsManagerSkeleton from './WidgetsManagerSkeleton';

function WidgetsManager(props) {
  return (
    <React.Suspense fallback={<WidgetsManagerSkeleton />}>
      <WidgetsManagerComponent {...props} />
    </React.Suspense>
  )
}

export default WidgetsManager;
