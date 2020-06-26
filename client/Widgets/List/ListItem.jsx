import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Box,
  Checkbox,
  IconButton,
  Typography,
} from '@material-ui/core';
import _trim from 'lodash/trim';
import { Fa } from '../../utils';
import {
  deleteListItem,
  toggleCheck,
  updateListItem,
} from './listActions';

function ListItem({
  checked,
  classes,
  idPk,
  index,
  text,
  type,
  updateCharacter,
}) {
  const [loading, setLoading] = useState(false);
  const [newText, setNewText] = useState(text);
  const isCheckList = type === 'CHECK';

  async function handleUpdate() {
    const trimmedUpdateText = _trim(newText);

    if (trimmedUpdateText === text) {
      return
    }

    try {
      await updateListItem(idPk, trimmedUpdateText);

      updateCharacter();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteListItem(idPk);

      updateCharacter();
    } catch (err) {
      console.error(err);

      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [checked]);

  async function handleCheck() {
    setLoading(true);

    try {
      await toggleCheck(idPk, checked);

      updateCharacter();
    } catch (err) {
      console.error(err);
    }
  }

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
            <Typography>{index + 1}.</Typography>
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
  });

  return (
    <li
      key={idPk}
      className={classnames({
        [classes.listItem]: true,
        [classes.checkItem]: isCheckList,
      })}
    >
      {prefix}
      
      <input
        disabled={loading}
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
  classes: PropTypes.shape().isRequired,
  idPk: PropTypes.string.isRequired,
  index: PropTypes.number,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

ListItem.propTypes = {
  index: 0,
}

export default ListItem;
