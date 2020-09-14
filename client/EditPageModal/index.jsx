import React from 'react';
import EditPageModalComponent from './EditPageModalComponent';

function EditPageModal() {
  return (
    <React.Suspense fallback="">
      <EditPageModalComponent />
    </React.Suspense>
  )
}

export default EditPageModal;
