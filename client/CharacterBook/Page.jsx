import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import _differenceWith from 'lodash/differenceWith';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import { Scrollbars } from '../utils';
import { usePage } from '../hooks';
import Widget from '../Widget';
import { flagState, pageSelector } from '../state';

const ResponsiveGrid = WidthProvider(GridLayout);

function formatLayout(content) {
  return _map(content, ({ idPk, layout }) => ({
    i: idPk,
    ...layout,
  }));
}

function getGridFromLayout(layout) {
  return _pick(layout, ['x', 'y', 'h', 'w', 'i']);
}

function Page({
  id,
}) {
  const { updateLayout } = usePage(id);
  const page = useRecoilValue(pageSelector(id));
  const editing = useRecoilValue(flagState('editMode'));
  const content = _map(_get(page, 'layout', []), ({
    idPk,
    type,
    widgetId,
    ...layout
  }) => ({
    idPk,
    layout,
    widgetId,
    widgetType: type,
  }));
  const formattedLayout = formatLayout(content);
  const layout = _map(formattedLayout, l => ({...l, static: !editing }));

  return (
    <>
      <ResponsiveGrid
        layout={layout}
        cols={12}
        rowHeight={30}
        onLayoutChange={(updatedLayout) => {
          const curLayoutGrid = _map(formattedLayout, getGridFromLayout);
          const updatedLayoutGrid = _map(updatedLayout, getGridFromLayout);
          const changes = _differenceWith(updatedLayoutGrid, curLayoutGrid, _isEqual);

          if(changes.length) {
            const updates = changes.map(change => ({
              idPk: change.i,
              x: change.x,
              y: change.y,
              width: change.w,
              height: change.h,
            }));

            updateLayout(updates);
          }
        }}
      >
        {
          _map(content, ({ idPk, widgetType, widgetId }) => (
            <div key={idPk}>
              <Scrollbars>
                <Widget
                  type={widgetType}
                  widgetId={widgetId}
                  pageId={id}
                  pageWidgetId={idPk}
                  editing={editing}
                />
              </Scrollbars>
            </div>
          ))
        }
      </ResponsiveGrid>
    </>
  );
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Page;
