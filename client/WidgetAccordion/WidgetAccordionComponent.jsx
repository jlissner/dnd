import React from 'react';
import PropTypes from 'prop-types';
import {
  useRecoilValue,
} from 'recoil';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { Fa } from '../utils';
import { widgetState } from '../state';
import widgets from '../Widget/widgets';


function WidgetAccordionComponent({
  id,
  type,
  expanded,
  handleExpand,
}) {
  const { Form } = widgets[type];
  const widget = useRecoilValue(widgetState(id));

  return (
    <Accordion
      expanded={expanded}
      onChange={() => handleExpand(id)}
    >
      <AccordionSummary
        expandIcon={<Fa icon="chevron-down" />}
      >
        <Typography>{widget.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form id={id} />
      </AccordionDetails>
    </Accordion>
  );
}

WidgetAccordionComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default WidgetAccordionComponent;
