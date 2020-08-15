import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import _cloneDeep from 'lodash/cloneDeep';
import _without from 'lodash/without';
import widgets from './widgets';
import { removeWidgetFromPage } from '../actions';
import { pageState } from '../state';

function Widget({
  type,
  widgetFk,
  pageId,
  pageWidgetId,
  editing,
}) {
  const { Component, Fallback } = widgets[type];
  const setPageState = useSetRecoilState(pageState(pageId));

  function removeFromPage() {
    setPageState((page) => {
      const updatedPage = _cloneDeep(page);

      updatedPage.layout = _without(updatedPage.layout, pageWidgetId);

      return updatedPage;
    });

    removeWidgetFromPage(pageWidgetId).catch(console.error);
  }

  return (
    <React.Suspense fallback={Fallback ? <Fallback /> : '...loading'}>
      <Box
        bgcolor="rgba(0, 0, 0, 0.23)"
        display={editing ? 'block' : 'none'}
        textAlign="center"
        position="absolute"
        pt="30%"
        left={0}
        right={0}
        top={0}
        bottom={0}
        zIndex={100}
      >
        <Button
          color="primary"
          onClick={removeFromPage}
          variant="contained"
        >
          Remove
        </Button>
      </Box>
      <Box height={1} width={1} p="2px">
        <Component id={widgetFk}/>
      </Box>
    </React.Suspense>
  );
}

Widget.propTypes = {
  widgetFk: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  pageWidgetId: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Widget;
