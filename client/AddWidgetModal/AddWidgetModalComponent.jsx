import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Tab,
  Tabs,
} from '@material-ui/core';
import _find from 'lodash/find';
import { flagState, widgetTypesState } from '../state';
import WidgetsManager from '../WidgetsManager';

function AddWidgetModalComponent() {
  const [addWidgetOpen, setAddWidgetOpen] = useRecoilState(flagState('addWidgetOpen'));
  const widgetTypes = useRecoilValue(widgetTypesState);
  const [tab, setTab] = useState('Attribute');
  const typeId = _find(widgetTypes, ['name', tab]).idPk;

  useEffect(() => {
    setTab(widgetTypes[0].name);
  }, [widgetTypes]);

  function onClose() {
    setAddWidgetOpen(false);
  }

  return (
    <Dialog open={addWidgetOpen} onClose={onClose} maxWidth="xl">
      <DialogTitle>Manage Widgets</DialogTitle>
      <Box display="flex">
        <Box width={320} borderRight="1px solid rgba(0, 0, 0, 0.42)">
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(e, newTab) => {
              setTab(newTab);
            }}
          >
            <Tab label="Attributes" value="Attribute" />
            <Tab label="Skills" value="Skill" />
            <Tab label="Stats" value="Stat" />
            <Tab label="Lists" value="List" />
            <Tab label="Text Boxes" value="TextBox" />
          </Tabs>
        </Box>
        <Box p={2} pt={0} width={1}>
          <WidgetsManager type={tab} typeId={typeId} />
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

AddWidgetModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddWidgetModalComponent;
