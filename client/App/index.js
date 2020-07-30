import React from 'react';
import AddWidgetModal from '../AddWidgetModal';
import AppComponent from './AppComponent';
import AppSkeleton from './AppSkeleton';

function App() {
  return (
    <React.Suspense fallback={<AppSkeleton />}>
      <AddWidgetModal />
      <AppComponent />
    </React.Suspense>
  )
}

export default App;
