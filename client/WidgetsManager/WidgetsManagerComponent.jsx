import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import widgets from '../Widget/widgets';
import { Fa } from '../utils';
import {
  characterWidgetsState,
  selectedCharacterState,
} from '../state';
import WidgetAccordion from '../WidgetAccordion';

function WidgetsManagerComponent({ type, typeId }) {
  const selectedCharacter = useRecoilValue(selectedCharacterState);
  const characterWidgets = useRecoilValue(characterWidgetsState({
    characterId: selectedCharacter,
    typeId: typeId,
  }));
  const {
    Form,
  } = widgets[type];
  const [expanded, setExpanded] = useState();

  function handleExpand(expandVal) {
    if (expanded === expandVal) {
      setExpanded(null);
    } else {
      setExpanded(expandVal);
    }
  }

  return (
    <Box>
      {_map(characterWidgets, (widgetId) => (
        <WidgetAccordion
          key={widgetId}
          id={widgetId}
          type={type}
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
          <Form />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

WidgetsManagerComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

export default WidgetsManagerComponent;
