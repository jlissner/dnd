import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { useCharacter } from '../hooks';
import Page from './Page';

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: 'absolute',
    top: '100%',
    left: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  tab: {
    background: '#E0E0A0',
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: '0 0 4px 4px',
    borderLeftWidth: 0,

    '&:first-child': {
      borderLeftWidth: 1,
    },

    '&.active': {
      background: theme.palette.background.paper,
      borderTop: 'none',
      paddingBottom: theme.spacing(1.25),
      paddingTop: theme.spacing(1.25),
    },
  },
}));

function CharacterBook({ id }) {
  const [character, updateCharacter] = useCharacter(id);
  const { name, pages } = character;
  const [currentPageId, setCurrentPageId] = useState(_get(pages, '[0].idPk'));
  const currentPage = _find(pages, ['idPk', currentPageId]);
  const classes = useStyles();

  useEffect(() => {
    if (!currentPage && _get(pages, 'length')) {
      setCurrentPageId(_get(pages, '[0].idPk'));
    }
  }, [pages, currentPage]);

  if (!currentPage) {
    return (
      <Paper>
        <Box p={2}>
          <CircularProgress />
        </Box>  
      </Paper>
    );
  }

  const pageContent = _map(currentPage.widgets, ({
    idPk,
    type,
    widgetId,
    ...layout
  }) => ({
    widgetType: type,
    layout,
    ..._find(character[type], ['idPk', widgetId]),
    widgetId,
    idPk,
  }));

  const tabs = _map(pages, (page) => (
    <button
      key={page.idPk}
      onClick={() => setCurrentPageId(page.idPk)}
      className={classnames({ [classes.tab]: true, active: currentPageId === page.idPk })}
    >
      {page.title}
    </button>
  ));

  return (
    <Paper>
      <Box p={1}>
        <Typography variant="h6">{name}</Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Page content={pageContent} updateCharacter={updateCharacter} />
      </Box>
      <div className={classes.tabs}>
        <button className={classes.tab}>test</button>
        {tabs}
        <button className={classes.tab}>test</button>
        <button className={classes.tab}>test</button>
        <button className={classes.tab}>test</button>
      </div>
    </Paper>
  )
}

CharacterBook.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterBook;
