import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import _differenceWith from 'lodash/differenceWith';
import _isEqual from 'lodash/isEqual';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import { UPDATE_PAGE_LAYOUT } from '../hooks/useCharacter';
import { List } from '../Widgets';

const ResponsiveGrid = WidthProvider(GridLayout);

const widgets = {
  LIST: List,
};

function formatLayout(content) {
  return _map(content, ({ idPk, layout }) => ({
    i: idPk,
    ...layout,
  }));
}

function Page({
  content,
  updateCharacter,
}) {
  const layout = formatLayout(content);

  return (
    <ResponsiveGrid
      layout={layout}
      cols={4}
      rowHeight={30}
      onLayoutChange={(updatedLayout) => {
        const formatedUpdates = _map(updatedLayout, l => _pick(l, ['x', 'y', 'h', 'w', 'i']));
        const changes = _differenceWith(formatedUpdates, layout, _isEqual);

        if(changes.length) {
          const updates = changes.map(change => ({
            idPk: change.i,
            x: change.x,
            y: change.y,
            width: change.w,
            height: change.h,
          }));
          
          updateCharacter(updates, UPDATE_PAGE_LAYOUT);
        }
      }}
    >
      {
        _map(content, ({ idPk, widgetType, layout, ...widget }) => {
          const WidgetComponent = widgets[widgetType];

          return (
            <div key={idPk}>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                {widget.idPk}
                <WidgetComponent {...widget} updateCharacter={updateCharacter} />
              </Scrollbars>
            </div>
          );
        })
      }
    </ResponsiveGrid>
  )
}

Page.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape()),
  updateCharacter: PropTypes.func.isRequired,
};

Page.defaultProps = {
  content: [],
};

export default Page;
