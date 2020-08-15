import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';
import _map from 'lodash/map';
import _slice from 'lodash/slice';
import _sum from 'lodash/sum';
import _toNumber from 'lodash/toNumber';
import { getNumericPrefix, Scrollbars } from '../../utils';
import useStat from './useStat';

const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'right',
  },
  root: {
    borderRadius: '0 0 4px 4px',
  }
}));

function StatTracker({ handleOpen, id, notesRef }) {
  const classes = useStyles();
  const {
    stat,
    saving,
    updateStatValue,
  } = useStat(id);
  const [statValue, setStatValue] = useState('');
  const [trackedValues, setTrackedValues] = useState([]);
  const inputRef = useRef(null);
  const startRef = useRef(_toNumber(stat.value));
  const lastNumber = useRef(_toNumber(stat.value));

  async function handleSave() {
    await updateStatValue(statValue);

    setStatValue('');
  }

  async function handleKeyDown(evt) {
    if (evt.keyCode === 13) {
      await handleSave();

      process.nextTick(() => {
        inputRef.current.select();
      });
    }
  }

  useEffect(() => {
    const modifier = stat.value - lastNumber.current;

    if (modifier) {
      setStatValue('');
      setTrackedValues((tv) => [...tv, modifier]);

      lastNumber.current = stat.value;
    }
  }, [stat.value, lastNumber]);

  function getDelta(fromIndex) {
    const vals = _slice(trackedValues, 0, fromIndex + 1);

    return _sum(vals);
  }

  return (
    <Box component={Paper} height={1} display="flex" flexDirection="column">
      <Box p={2} onClick={handleOpen} ref={notesRef}>
        <Typography variant="h5">
          {stat.name}
        </Typography>
      </Box>
      <Divider />
      <Box py={2} height={1}>
        <Scrollbars stickyBottom>
          <Box px={2} height={1}>
            <Typography align="right" varaint="h6">{startRef.current}</Typography>
            {_map(trackedValues, (val, i) => (
              <React.Fragment key={`${val}-${i}`}>
                <Box
                  color={val > -1 ? 'success.main' : 'error.main'}
                  textAlign="right"
                  mb={0.5}
                >
                  {getNumericPrefix(val)}{val}
                </Box>
                <Divider />
                <Typography align="right" varaint="h6">{startRef.current + getDelta(i)}</Typography>
              </React.Fragment>
            ))}
          </Box>
        </Scrollbars>
      </Box>
      <Box
        bgcolor="rgba(0, 0, 0, 0.09)"
        mt="-1px"
        zIndex={1}
      >
        <TextField
          InputProps={{ classes }}
          fullWidth
          disabled={saving}
          inputRef={inputRef}
          placeholder={`Modify ${stat.title}`}
          value={statValue}
          onFocus={() => inputRef.current.select()}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onChange={(evt) => setStatValue(evt.target.value)}
          variant="outlined"
        />
      </Box>
    </Box>
  )
}

StatTracker.propTypes = {
  id: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  notesRef: PropTypes.shape().isRequired,
};

export default StatTracker;
