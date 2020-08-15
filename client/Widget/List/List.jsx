import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { SortableContainer } from 'react-sortable-hoc';
import _map from 'lodash/map';
import arrayMove from 'array-move';
import { useRefresh } from '../../hooks';
import ListItem from './ListItem';

function List({
  classes,
  Component,
  items,
  type,
  updateItem,
  reorderItems,
  removeItem,
  orderStart,
  saving,
}) {
  const [reordering, setReordering] = useState(false);
  const updatedItems = useRef(items);
  const refresh = useRefresh();
  const Container = useMemo(() => SortableContainer(Component), [Component]);

  if (!reordering && !saving) {
    updatedItems.current = items;
  }

  useEffect(() => {
    refresh();
    setReordering(false)
  }, [items, refresh]);

  return (
    <Container
      className={classes.root}
      useDragHandle
      onSortEnd={async ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) {
          return;
        }

        setReordering(true);

        const newUpdatedItems = arrayMove(updatedItems.current, oldIndex, newIndex);

        updatedItems.current = newUpdatedItems;
        refresh();

        reorderItems(newUpdatedItems);
      }}
    >
      {_map(updatedItems.current, (item, i) => (
        <ListItem
          disabled={reordering}
          key={item.text}
          classes={classes}
          type={type}
          index={i}
          order={orderStart + i + 1}
          updateItem={updateItem}
          removeItem={removeItem}
          reordering={reordering}
          {...item}
        />
      ))}
    </Container>
  );
}

List.propTypes = {
  classes: PropTypes.shape(),
  Component: PropTypes.elementType,
  items: PropTypes.arrayOf(PropTypes.shape()),
  type: PropTypes.string,
  updateItem: PropTypes.func.isRequired,
  reorderItems: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  orderStart: PropTypes.number,
  saving: PropTypes.bool.isRequired,
};

const defaultItems = [];

List.defaultProps = {
  classes: {},
  Component: 'ul',
  items: defaultItems,
  type: 'UNORDERED',
  orderStart: 0,
}

export default List;
