import React, { useEffect, useMemo,   useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Fab,
  Paper,
} from '@material-ui/core';
import { v4 } from 'uuid';
import _without from 'lodash/without';
import { If } from '../utils';
import { useGlobalState } from '../hooks';

function Hideaway({
  icon,
  children,
}) {
  const id = useMemo(v4, []);
  const [hideaway, setHideaway] = useGlobalState('hideaway', [id]);
  const [show, setShow] = useState(false);
  const index = hideaway.indexOf(id);

  useEffect(() => {
    setHideaway((curVal) => {
      const curIndex = curVal.indexOf(id);

      if (curIndex === -1) {
        return [...curVal, id];
      }

      return curVal;
    });

    return () => setHideaway((curVal) => _without(curVal, id))
  }, [setHideaway, id]);

  return (
    <>
      <Box position="fixed" top={96 + (index * 48)} left={32}>
        <Fab
          onClick={() => setShow(!show)}
          size="small"
          color="primary"
        >
          {icon}
        </Fab>
      </Box>
      <If conditions={[show]}>
        <Box
          id={id}
          position="fixed"
          left={106}
          right={32}
          bottom={32}
          top={96}
        >
          <Box component={Paper} maxHeight={1} overflow="auto">
            <Box p={2}>
              {children}
            </Box>
          </Box>
        </Box>
      </If>
    </>
  )
}

Hideaway.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Hideaway;
