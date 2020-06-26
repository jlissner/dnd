import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import _map from 'lodash/map';
import ListItem from './ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    listStyle: 'none',
  },
  checkItem: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
  },
}));

function SecondaryList({
  items,
  updateCharacter,
}) {
  const classes = useStyles();

  return (
    _map(items, (item) => (
      <ListItem
        key={item.idPk}
        classes={classes}
        updateCharacter={updateCharacter}
        type="CHECK"
        {...item}
      />
    ))
  )
}

SecondaryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default SecondaryList;
