import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Tab,
  Tabs,
} from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _toUpper from 'lodash/toUpper';
import Attack from './Attack';

const useTabsStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '&::after': {
      content: '""',
      height: 1,
      background: 'rgba(0, 0, 0, 0.42)',
      position: 'absolute',
      bottom: 1,
      left: 0,
      right: 0,
      display: 'block',
      zIndex: 1,
    },
  },
  indicator: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid white',
    borderBottomColor: theme.palette.background.paper,
    zIndex: 2,
  },
}));

const useTabStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
    borderRight: '1px solid rgba(0, 0, 0, 0.42)',
    borderTop: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: '4px 4px 0 0',
    '&:hover': {
    },
    '&$selected': {
      border: 'none',
      background: theme.palette.background.paper,
    },
    '&:focus': {
    },
  },
  selected: {},
}));

function Attacks({
  character,
  onSave,
}) {
  const attacks = _get(character, 'equipment.attacks');
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();

  return (
    <Box
      bgcolor="rgba(0, 0, 0, 0.09)"
      border={1}
      borderColor="rgba(0, 0, 0, 0.42)"
      borderRadius={4}
      pt={1}
    >
      <Tabs classes={tabsClasses} value={2} variant="scrollable">
        <Tab classes={tabClasses} label="one" value={1}/>
        <Tab classes={tabClasses} label="two" value={2}/>
        <Tab classes={tabClasses} label="three" value={3}/>
      </Tabs>
      <Box bgcolor="background.paper" p={2}>
        {_map(attacks, atk => (
          <Attack attack={atk} character={character} key={atk.name} />
        ))}
      </Box>
    </Box>
  )
}

Attacks.propTypes = {
  character: PropTypes.shape(),
  onSave: PropTypes.func.isRequired,
};

export default Attacks;
