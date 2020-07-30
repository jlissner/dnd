import React from 'react';
import AddWidgetModalComponent from './AddWidgetModalComponent';

function AddWidgetModal() {
  return (
    <React.Suspense fallback="">
      <AddWidgetModalComponent />
    </React.Suspense>
  )
}

export default AddWidgetModal;
