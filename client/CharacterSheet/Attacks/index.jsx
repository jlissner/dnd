import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import {
  Confirm,
  Fa,
  removeByIndex,
  replaceByIndex,
} from '../../utils';
import AddButton from '../../Form/AddButton';
import Attack from './Attack';

const useTabsStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    marginBottom: 0,
  },
  indicator: {
    transition: '0s all',
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid white',
    borderBottomColor: theme.palette.background.paper,
    left: '0 !important',
    right: 0,
    width: 'auto !important',
    zIndex: 2,
  },
}));

const useTabStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
    borderTop: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: '4px 4px 0 0',
    marginTop: theme.spacing(1),

    '&:last-child': {
      borderRight: '1px solid rgba(0, 0, 0, 0.42)',
    },

    '&:hover': {
    },
    '&$selected': {
      marginTop: 0,
      borderRight: '1px solid rgba(0, 0, 0, 0.42)',
      background: theme.palette.background.paper,

      '& + $root': {
        borderLeft: 'none',
      },
    },
    '&:focus': {
    },
  },
  selected: {},
}));

function createNewAttack(category) {
  return {
    bonusModifier: 0,
    dmg: '',
    dmgType: '',
    category,
    name: '',
    notes: '',
    range: '',
    uses: 0,
  }
}

function Attacks({
  attributes,
  updateCharacter,
}) {
  const { attacks } = attributes;
  const [newAttacks, setNewAttacks] = useState(attacks);
  const [newTab, setNewTab] = useState('');
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const categories = useMemo(() => {
    const cats = _map(newAttacks, ({ category }) => category);

    return _uniq(cats);
  }, [newAttacks]);
  const [tab, setTab] = useState(categories[0]);
  const addDisabled = newAttacks.length > 0 ? !_last(newAttacks).name : false;

  useEffect(() => {
    setNewAttacks(attacks);
  }, [attacks]);

  function onDelete(index) {
    const categoryOfDeletedItem = newAttacks[index].category;
    const numberOfItemsInCategory = _filter(newAttacks, { category: categoryOfDeletedItem}).length;
    const updatedAttacks = removeByIndex(newAttacks, index);

    if (numberOfItemsInCategory === 1) {
      setTab(categories[0])
    }

    if (_isEqual(updatedAttacks, attacks)) {
      setNewAttacks(updatedAttacks);
    } else {
      updateCharacter({ attributes: { attacks: updatedAttacks } });
    }
  }

  function onSave(newAttack, index) {
    const updatedAttacks = replaceByIndex(newAttacks, newAttack, index);

    updateCharacter({ attributes: { attacks: updatedAttacks } });
  }

  function onAdd(category) {
    if (category) {
      setNewAttacks([...newAttacks, createNewAttack(category)]);
    }
  }

  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
    >
      <Tabs
        classes={tabsClasses}
        value={tab}
        variant="scrollable"
        onChange={(_, val) => categories.indexOf(val) > -1 && setTab(val)}
      >
        {_map(categories, (cat) => (
          <Tab
            classes={tabClasses}
            disabled={addDisabled}
            key={cat}
            label={cat}
            value={cat}
          />
        ))}
        <Confirm
          Component={Tab}
          classes={tabClasses}
          disabled={addDisabled}
          label={<Fa icon="plus" />}
          text={(
            <TextField
              fullWidth
              label="Title"
              value={newTab}
              variant="filled"
              onChange={(evt) => setNewTab(evt.target.value)}
            />
          )}
          title="New Category"
          onConfirm={() => {
            onAdd(newTab);
            setTab(newTab);
            setNewTab('');
          }}
        />
      </Tabs>
      <Box
        bgcolor="background.paper"
        borderColor="rgba(0, 0, 0, 0.42)"
        borderBottom={1}
        borderTop={1}
        p={2}
        mt="-3px"
      >
        <Grid container spacing={2}>
          {_map(newAttacks, (attack, i) => attack.category === tab && (
            <Grid item xs={12} key={attack.name}>
              <Attack
                attack={attack}
                attributes={attributes}
                onDelete={() => onDelete(i)}
                onSave={(newAttack) => onSave({ ...newAttack, category: tab }, i)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <AddButton disabled={addDisabled} onAdd={() => onAdd(tab)} />
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Typography align="center" variant="h6">Attacks</Typography>
      </Box>
    </Box>
  )
}

Attacks.propTypes = {
  attributes: PropTypes.shape(),
  updateCharacter: PropTypes.func.isRequired,
};

export default Attacks;
