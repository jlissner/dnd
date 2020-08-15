import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Typography,
} from '@material-ui/core';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import gameboard from '../assets/gameboard.jpg';
import { useCharacter } from '../hooks';
import { selectedPageState } from '../state';
import { Fa, Scrollbars } from '../utils';
import CharacterBookHeader from './CharacterBookHeader';
import CharacterBookSkeleton from './CharacterBookSkeleton';
import Page from './Page';
import PageSkeleton from './PageSkeleton';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: `url('${gameboard}')`,
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${theme.spacing(2)}px)`,
  },
  tabs: {
    position: 'absolute',
    top: `calc(100% - ${theme.spacing(2)}px)`,
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

function CharacterBookComponent({ id }) {
  const classes = useStyles();
  const { character } = useCharacter(id);
  const { pages } = character || {};
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);

  useEffect(() => {
    if (!selectedPage && _get(pages, 'length')) {
      setSelectedPage(_get(pages, '[0].idPk'));
    }
  }, [pages, selectedPage, setSelectedPage]);

  if (!character || _isNil(selectedPage)) {
    if (_get(pages, 'length')) {
      return <CharacterBookSkeleton />;
    } else {
      return <Typography>Add a page...</Typography>;
    }
  }

  const tabs = _map(pages, (page) => (
    <button
      key={page.idPk}
      onClick={() => setSelectedPage(page.idPk)}
      className={classnames({ [classes.tab]: true, active: selectedPage === page.idPk })}
    >
      {page.title}
    </button>
  ));

  return (
    <Paper className={classes.paper}>
      <Box p={1} bgcolor="background.paper" boxShadow="0px 3px 4px -3px" zIndex={1}>
        <CharacterBookHeader />
      </Box>
      <React.Suspense fallback={<PageSkeleton />}>
        <Scrollbars>
          <Box p={2}>
            <Page id={selectedPage} />
          </Box>
        </Scrollbars>
      </React.Suspense>
      <div className={classes.tabs}>
        {tabs}
        <button type="button" className={classes.tab}>
          <Fa icon="plus" />
        </button>
      </div>
    </Paper>
  )
}

CharacterBookComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterBookComponent;
