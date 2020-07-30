import React, { useEffect, useRef, useState } from 'react';
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
}) {
  const [reordering, setReordering] = useState(false);
  const updatedItems = useRef(items);
  const refresh = useRefresh();
  const Container = SortableContainer(Component);

  if (!reordering) {
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

        try {
          const itemsToUpdate = _map(newUpdatedItems, ({ listOrder, ...item }, i) => (
            i === listOrder
            ? false
            : { ...item, listOrder: i }
          )).filter(Boolean);

          reorderItems(itemsToUpdate);
        } catch (err) {
          setReordering(false);

          console.error(err);
        }
      }}
    >
      {_map(updatedItems.current, (item, i) => (
        <ListItem
          disabled={reordering}
          key={item.idPk}
          classes={classes}
          type={type}
          index={i}
          order={i+1}
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
};

const defaultItems = [];

List.defaultProps = {
  classes: {},
  Component: 'ul',
  items: defaultItems,
  type: 'UNORDERED',
}

export default List;
