import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
} from '@material-ui/core';
import { Section } from '../../Displays';
import HealthHistory from './HealthHistory';
import UpdateHealth from './UpdateHealth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',

    '& > div:first-child': {
      flexGrow: 1,
    },
  },
  currentHp: {
    fontSize: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    height: ({ height }) => height - theme.spacing(2),
    overflow: 'hidden',
  },
}));

function Health({
  character,
  updateCharacter,
}) {
  const id = useMemo(v4, [v4]);
  const [height, setHeight] = useState(0);
  const { health } = character;
  const { currentHp } = health;
  const classes = useStyles({ height });
  const startHealth = useRef(currentHp);
  const [healthHistory, setHealthHistory] = useState([]);

  function updateHealthHistory(newHistory) {
    setHealthHistory([...healthHistory, newHistory]);
  }

  function updateCurrentHP(newHp) {
    updateCharacter({ health: { ...health, currentHp: newHp }});
  }

  useEffect(() => {
    setHeight(document.getElementById(id).offsetHeight)
  }, [id])

  return (
    <Section
      className={classes.root}
      label="Current HP"
    >
      <Box p={1} height={1} id={id}>
        <Grid container spacing={2} className={classes.wrapper}>
          <Grid item xs={6} className={classes.currentHp}>
            {currentHp}
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              className={classes.rightSide}
            >
              <Grid item className={classes.historyWrapper}>
                <HealthHistory
                  history={healthHistory}
                  startHealth={startHealth.current}
                />
              </Grid>
              <Grid item>
                <UpdateHealth
                  updateCurrentHP={updateCurrentHP}
                  updateHealthHistory={updateHealthHistory}
                  hp={currentHp}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Section>
  )
}

Health.propTypes = {
  character: PropTypes.shape().isRequired,
  updateCharacter: PropTypes.func.isRequired,
};

export default Health;
