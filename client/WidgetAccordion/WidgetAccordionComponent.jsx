import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Typography,
} from '@material-ui/core';
import _cloneDeep from 'lodash/cloneDeep';
import _maxBy from 'lodash/maxBy';
import _without from 'lodash/without';
import { addWidgetToPage } from '../actions';
import { Fa } from '../utils';
import {
  userState,
  widgetState,
  pageLayoutState,
  pageSelector,
  pageState,
  selectedPageState,
  flagState,
  userWidgetsState,
} from '../state';
import { useForm } from '../hooks';
import widgets from '../Widget/widgets';

function getLayoutData(widgetLayouts) {
  const heighest = _maxBy(widgetLayouts, 'y');
  const y = heighest ? (heighest.y + 1) : 0;

  return {
    y,
    x: 0,
    height: 4,
    width: 1
  }
}

function WidgetAccordionComponent({
  id,
  type,
  expanded,
  handleExpand,
}) {
  const {
    schema,
    update,
    remove,
  } = widgets[type];
  const [saving, setSaving] = useState(false);
  const user = useRecoilValue(userState);
  const setUserWidgets = useSetRecoilState(userWidgetsState({ userId: user.idPk, widgetType: type }));
  const selectedPage = useRecoilValue(selectedPageState);
  const pageDetails = useRecoilValue(pageSelector(selectedPage));
  const [page, setPage] = useRecoilState(pageState(selectedPage));
  const setAddWidgetOpen = useSetRecoilState(flagState('addWidgetOpen'));
  const [widget, setWidget] = useRecoilState(widgetState({ type, widgetId: id }));
  const formOptions = useMemo(() => ({
    schema,
    value: widget,
    onSave: async (newVal) => {
      const updatedWidget = { ...newVal, userFk: user.idPk };
      
      try {
        setSaving(true);

        await update(updatedWidget);
        
        setWidget(updatedWidget)
      } catch (error) {
        console.error(error);
      }

      setSaving(false);
    },
    FormItemProps: { disabled: saving },
  }), [schema, widget, user, saving, setWidget, update]);
  const {
    form,
    handleSave,
    reset,
    hasChanges,
  } = useForm(formOptions);
  const handleNewLayout = useRecoilCallback(({ set }) => (layout) => {
    const updatedPage = _cloneDeep(page);

    updatedPage.layout.push(layout.idPk);

    set(pageLayoutState(layout.idPk), layout);
    setPage(updatedPage);
  });

  useEffect(() => {
    reset();
  }, [expanded, widget, reset]);

  console.log({ layout: pageDetails.layout });

  async function handleAddWidget() {
    setSaving(true);

    const layoutData = getLayoutData(pageDetails.layout);
    const newLayout = await addWidgetToPage(
      page.idPk,
      { type, idPk: id },
      layoutData,
    );

    handleNewLayout(newLayout);
    setAddWidgetOpen(false);
  }

  async function handleDelete() {
    setSaving(true);

    await remove(id);

    setUserWidgets((userWidgets) => _without(userWidgets, id));
    setWidget(null);
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={() => handleExpand(id)}
    >
      <AccordionSummary
        expandIcon={<Fa icon="chevron-down" />}
      >
        <Typography>{widget.title}</Typography>
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
        <Button
          color="primary"
          disabled={saving}
          variant="contained"
          onClick={handleAddWidget}
        >
          Add To Page
        </Button>
        <Button
          disabled={saving}
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </AccordionActions>
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
