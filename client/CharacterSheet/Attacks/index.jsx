import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { 
  Add as AddIcon,
} from '@material-ui/icons';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
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
    zIndex: 2,
  },
}));

const useTabStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px 4px 0 0',
    '&:hover': {
    },
    '&$selected': {
      borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
      borderRight: '1px solid rgba(0, 0, 0, 0.42)',
      borderTop: '1px solid rgba(0, 0, 0, 0.42)',
      background: theme.palette.background.paper,
    },
    '&:focus': {
    },
  },
  selected: {},
}));

function Attacks({
  character,
  onDelete,
  onSave,
}) {
  const { attacks } = character;
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const categories = useMemo(() => {
    const cats = _map(attacks, ({ category }) => category);

    return _uniq(cats);
  }, [attacks]);
  const [tab, setTab] = useState(categories[0]);
  const categoryAttacks = _filter(attacks, { category: tab });

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
        onChange={(_, val) => val && setTab(val)}
      >
        {_map(categories, (cat) => (
          <Tab classes={tabClasses} key={cat} label={cat} value={cat}/>
        ))}
        <Tab onClick={() => alert('make me work')} value={false} label={<AddIcon />} />
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
          {_map(categoryAttacks, attack => (
            <Grid item xs={12} key={attack.name}>
              <Attack
                attack={attack}
                character={character}
                onDelete={onDelete}
                onSave={onSave}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box p={2}>
        <Typography align="center" variant="h6">Attacks</Typography>
      </Box>
    </Box>
  )
}

Attacks.propTypes = {
  character: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Attacks;
