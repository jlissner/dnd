import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import { Fa, If } from '../../utils';
import { addItem } from './listActions';
import ListItem from './ListItem';
import SecondaryList from './SecondaryList';

const useStyles = makeStyles((theme) => ({
  addItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    listStyle: 'none',
    marginBottom: ({ isCheckList }) => isCheckList ? theme.spacing(1) : 0,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.09)',
    },
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    paddingRight: theme.spacing(2),
    listStyle: 'none',

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.09)',
    },

    '&:hover $deleteBtn': {
      opacity: 1,
    }
  },
  checkItem: {
  },
  deleteBtn: {
    padding: 0,
    width: theme.spacing(2),
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
  }, 
  input: {
    background: 'none',
    border: 'none',
    width: '100%',
  },
  root: {
    overflowX: 'hidden',
    marginTop: ({ showTitle }) => showTitle ? 0 : theme.spacing(2),
    paddingLeft: 0,
  },
}));

function List({
  widgetId,
  title,
  type,
  showTitle,
  items,
  updateCharacter,
}) {
  const [adding, setAdding] = useState(false);
  const isCheckList = type === 'CHECK';
  const Root = type === 'ORDERED' ? 'ol' : 'ul';
  const sortedItems = _sortBy(items, ['checked', 'listOrder']);
  const classes = useStyles({ showTitle, isCheckList });
  const uncheckedItems = _filter(sortedItems, ['checked', false]);
  const checkedItems = _filter(sortedItems, 'checked');
  const primaryItems = isCheckList
    ? uncheckedItems
    : sortedItems;

  useEffect(() => {
    setAdding(false);
  }, [items.length]);

  async function handleAdd() {
    setAdding(true);

    try {
      await addItem(widgetId, sortedItems.length);

      updateCharacter();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showTitle && <Typography variant="h5">{title}</Typography>}
      <Root className={classes.root}>
        {_map(primaryItems, (item, i) => (
          <ListItem
            key={item.idPk}
            classes={classes}
            type={type}
            updateCharacter={updateCharacter}
            index={i}
            {...item}
          />
        ))}
        <ButtonBase
          component="li"
          className={classes.addItem}
          role="button"
          onClick={handleAdd}
        >
          <Box width={isCheckList ? 42 : 32} textAlign="center">
            { adding
              ? <CircularProgress size={14} />
              : <Fa icon="plus" />
            }
          </Box>
          Add Item
        </ButtonBase>
        <If conditions={[isCheckList]}>
          <Divider />
          <SecondaryList
            items={checkedItems}
            updateCharacter={updateCharacter}
          />
        </If>
      </Root>
    </>
  )
}

List.propTypes = {
  widgetId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default List;
