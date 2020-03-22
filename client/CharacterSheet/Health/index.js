import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
} from '@material-ui/core';
import { Section } from '../../Displays';
import HealthHistory from './HealthHistory';
import UpdateHealth from './UpdateHealth';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',

    '& > div:first-child': {
      flexGrow: 1,
    },
  },
}));

function Health({
  character,
  updateCharacter,
}) {
  const { health } = character;
  const { currentHp } = health;
  const classes = useStyles();
  const startHealth = useRef(currentHp);
  const [healthHistory, setHealthHistory] = useState([]);

  console.log({ startHealth });

  function updateHealthHistory(newHistory) {
    setHealthHistory([...healthHistory, newHistory]);
  }

  function updateCurrentHP(newHp) {
    updateCharacter({ health: { ...health, currentHp: newHp }});
  }

  return (
    <Section
      className={classes.root}
      label="Current HP"
    >
      <Box p={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {currentHp}
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <HealthHistory
                  history={healthHistory}
                  startHealth={startHealth.current}
                />
              </Grid>
              <Grid item xs={12}>
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
