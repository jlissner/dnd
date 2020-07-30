import React from 'react';
import WidgetAccordionSkeleton from './WidgetAccordionSkeleton';
import WidgetAccordionComponent from './WidgetAccordionComponent';

function WidgetAccordion(props) {
  return (
    <React.Suspense fallback={<WidgetAccordionSkeleton />}>
      <WidgetAccordionComponent {...props} />
    </React.Suspense>
  )
}

export default WidgetAccordion;
