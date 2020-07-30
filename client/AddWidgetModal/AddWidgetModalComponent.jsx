import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import widgets from '../Widget/widgets';
import { Fa } from '../utils';
import { useForm } from '../hooks';
import {
  characterWidgetsState,
  flagState,
  selectedCharacterState,
  userState,
} from '../state';
import WidgetAccordion from '../WidgetAccordion';

const startVal = {};

function AddWidgetModalComponent() {
  const [addWidgetOpen, setAddWidgetOpen] = useRecoilState(flagState('addWidgetOpen'));
  const [tab, setTab] = useState('LIST');
  const user = useRecoilValue(userState);
  const selectedCharacter = useRecoilValue(selectedCharacterState);
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId: selectedCharacter,
    widgetType: tab,
  }));
  const {
    create,
    schema,
  } = widgets[tab];
  const [expanded, setExpanded] = useState();
  const [saving, setSaving] = useState(false);
  const formOptions = useMemo(() => ({    
    schema,
    value: startVal,
    onSave: async (newVal, reset) => {
      const newWidget = { ...newVal, userFk: user.idPk };

      setSaving(true);

      try {
        const createdWidget = await create(newWidget, selectedCharacter);
        
        setCharacterWidgets((curCharWidgets) => [...curCharWidgets, createdWidget.idPk]);
        reset();
      } catch (error) {
        console.error(error);
      }

      setSaving(false);
    },
    FormItemProps: { disabled: saving },
  }), [create, schema, user, saving, selectedCharacter, setCharacterWidgets]);
  const { form, handleSave, reset, hasChanges } = useForm(formOptions);

  function handleExpand(expandVal) {
    if (expanded === expandVal) {
      setExpanded(null);
    } else {
      setExpanded(expandVal);
    }
  }

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
              reset();
              setTab(newTab);
            }}
          >
            <Tab label="Counters" value="COUNTER" />
            <Tab label="Lists" value="LIST" />
            <Tab label="...Coming Soon" value="NONE" />
          </Tabs>
        </Box>
        <Box p={2} pt={0} width={1}>
          {_map(characterWidgets, (widgetId) => (
            <WidgetAccordion
              key={widgetId}
              id={widgetId}
              type={tab}
              expanded={expanded === widgetId}
              handleExpand={handleExpand}
            />
          ))}
          <Accordion
            expanded={expanded === 'new'}
            onChange={() => handleExpand('new')}
          >
            <AccordionSummary
              expandIcon={<Fa icon="chevron-down" />}
            >
              <Typography>New</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {form}
            </AccordionDetails>
            <AccordionActions>
              <Button
                color="primary"
                disabled={!hasChanges || saving}
                onClick={handleSave}
                variant="contained"
              >
                Save
              </Button>
            </AccordionActions>
          </Accordion>
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
