import React, { useEffect, useRef, useState } from 'react';
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
    h: layout.h || 1,
    w: layout.w || 1,
  }));
}

function getGridFromLayout(layout) {
  return _pick(layout, ['x', 'y', 'h', 'w', 'i']);
}

function Page({
  id,
}) {
  const { updateLayout } = usePage(id);
  const layoutRef = useRef(null);
  const saving = useRecoilValue(flagState('savingPage'));
  const page = useRecoilValue(pageSelector(id));
  const editing = useRecoilValue(flagState('editMode'));
  const content = _map(_get(page, 'layout', []), ({
    idPk,
    type,
    widgetFk,
    ...layout
  }) => ({
    idPk,
    layout,
    widgetFk,
    widgetType: type,
  }));
  const formattedLayout = formatLayout(content);
  const layout = _map(formattedLayout, l => ({...l, static: !editing }));
  const [editableLayout, setEditableLayout] = useState(layout);

  layoutRef.current = layout;

  useEffect(() => {
    if (!saving) {
      setEditableLayout(layoutRef.current);
    }
  }, [saving, layoutRef]);

  useEffect(() => {
    setEditableLayout(layoutRef.current);
  }, [id]);

  useEffect(() => {
    setEditableLayout(editableLayout => _map(editableLayout, l => ({...l, static: !editing })))
  }, [editing]);
  
  useEffect(() => {
    if (editing || saving) {
      return;
    }

    const curLayoutGrid = _map(formattedLayout, getGridFromLayout);
    const updatedLayoutGrid = _map(editableLayout, getGridFromLayout);
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
  }, [editing, editableLayout, formattedLayout, saving, updateLayout]);

  return (
    <>
      <ResponsiveGrid
        layout={editableLayout}
        cols={12}
        rowHeight={10}
        onLayoutChange={(updatedLayout) => {
          setEditableLayout(updatedLayout);
        }}
      >
        {
          _map(content, ({ idPk, widgetType, widgetFk }) => (
            <div key={idPk}>
              <Scrollbars>
                <Widget
                  type={widgetType}
                  widgetFk={widgetFk}
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

export default React.memo(Page);
