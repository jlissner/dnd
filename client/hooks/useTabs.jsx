import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';

function useTabs(tabs) {
  const [tab, setTab] = useState(tabs[0].value);

  const TabComponent = (props) => (
    <div>
      {props.title}
      <Tabs value={tab} onChange={(_, val) => setTab(val)} variant="scrollable">
        {tabs.map(t => <Tab key={t.value} value={t.value} label={t.label} />)}
      </Tabs>
    </div>
  );

  return [tab, TabComponent]
}

export default useTabs;
