import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import _filter from 'lodash/filter';
import _sortBy from 'lodash/sortBy';
import { useList } from '../../hooks';
import { Fa } from '../../utils';
import List from './List';

const useStyles = makeStyles((theme) => ({
  addItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    listStyle: 'none',
    marginBottom: ({ isCheckList }) => isCheckList ? theme.spacing(1) : 0,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.09)',
    },
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    paddingRight: theme.spacing(2),
    listStyle: 'none',
    position: 'relative',
    zIndex: 1,

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.09)',
    },

    '&:hover $deleteBtn': {
      opacity: 1,
    },

    '&:hover $grip': {
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
    marginBottom: 0,
  },
  grip: {
    opacity: 0,
    transition: '.2s opacity ease-in-out',
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'grab',
  },
}));

function ListWidget({
  id,
}) {
  const {
    list,
    addItem,
    updateItem,
    reorderItems,
    removeItem,
  } = useList(id);
  const {
    listItems: items = [],
    title,
    type,
    showTitle,
  } = list || {};
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
      await addItem(sortedItems.length);
    } catch (err) {
      console.error(err);
    }
  }

  if (!list) {
    return (
      <Alert severity="error">
        <AlertTitle>This List Has Been Deleted</AlertTitle>
        <p>
          This list has been deleted and can no longer be shown.
        </p>
        <p>
          Please remove this from this page.
        </p>
      </Alert>
    )
  }

  return (
    <Box p="2px" height={1} width={1}>
      <Box component={Paper} p={1} height={1} width={1}>
        {showTitle && <Typography variant="h5">{title}</Typography>}

        <List
          classes={classes}
          Component={Root}
          items={primaryItems}
          type={type}
          updateItem={updateItem}
          reorderItems={reorderItems}
          removeItem={removeItem}
        />
        <ButtonBase
          component="div"
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
          
        { isCheckList &&
          <>
            <Divider />
            <List
              classes={classes}
              Component={Root}
              items={checkedItems}
              type={type}
              updateItem={updateItem}
              reorderItems={reorderItems}
              removeItem={removeItem}
            />
          </>
        }
      </Box>
    </Box>
  )
}

ListWidget.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ListWidget;
