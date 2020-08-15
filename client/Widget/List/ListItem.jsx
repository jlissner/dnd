import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Box,
  Checkbox,
  IconButton,
  Typography,
} from '@material-ui/core';
import { SortableElement } from 'react-sortable-hoc';
import _trim from 'lodash/trim';
import { Fa } from '../../utils';
import SortGrip from './SortGrip';

function ListItem({
  checked,
  classes,
  idPk,
  order,
  text,
  type,
  updateItem,
  removeItem,
  reordering,
}) {
  const [loading, setLoading] = useState(false);
  const [newText, setNewText] = useState(text);
  const isCheckList = type === 'CHECK';

  function handleUpdate() {
    const trimmedUpdateText = _trim(newText);

    if (trimmedUpdateText === text) {
      return
    }

    setLoading(true);
    updateItem({ index: order - 1, text: trimmedUpdateText });
  }

  function handleDelete() {
    setLoading(true);

    removeItem(order - 1);
  }

  useEffect(() => {
    setLoading(false);
  }, [checked, text]);

  const handleCheck = useCallback(async () => {
    setLoading(true);

    updateItem({ index: order - 1, checked: !checked });
  }, [order, checked, updateItem]);

  const prefix = useMemo(() => {
    switch (type) {
      case 'CHECK': {
        return (
          <Checkbox
            disabled={loading}
            checked={checked}
            onClick={handleCheck}
          />
        );
      }
      case 'ORDERED': {
        return (
          <Box width={32} textAlign="center">
            <Typography>{order}.</Typography>
          </Box>
        );
      }
      case 'UNORDERED':
      default: {
        return (
          <Box width={32} textAlign="center">
            <Fa icon="circle" transform="shrink-8" />
          </Box>
        );
      }
    }
  }, [type, loading, checked, handleCheck, order]);

  return (
    <li
      key={idPk}
      className={classnames({
        [classes.listItem]: true,
        [classes.checkItem]: isCheckList,
      })}
    >
      <SortGrip className={classes.grip} />

      {prefix}
      
      <input
        disabled={reordering || loading}
        className={classes.input}
        onBlur={handleUpdate}
        onChange={e => setNewText(e.target.value)}
        value={newText}
      />

      <IconButton
        className={classes.deleteBtn}
        disabled={loading}
        onClick={handleDelete}
      >
        <Fa icon="trash" transform="shrink-6"/>
      </IconButton>
    </li>);
}

ListItem.propTypes = {
  checked: PropTypes.bool.isRequired,
  reordering: PropTypes.bool.isRequired,
  classes: PropTypes.shape().isRequired,
  idPk: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default SortableElement(ListItem);
