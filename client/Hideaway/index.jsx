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

let counter = 0

function useHideaway(id) {
  const [hideaway, setHideaway] = useGlobalState('hideaway', []);
  const index = hideaway.indexOf(id);

  useEffect(() => {
    if (index === -1) {
      setHideaway([...hideaway, id]);
    }
  }, [id, hideaway, index]);

  return {
    fabLeft: 32,
    fabTop: 124 + (index * 64)
  };
}

function Hideaway({
  icon,
  children,
}) {
  const id = useMemo(v4, [v4]);
  console.log({ id });
  const {
    fabLeft,
    fabTop,
    contentLeft,
    contentTop,
  } = useHideaway(id);
  const [show, setShow] = useState(false);

  return (
    <>
      <If conditions={[show]}>
        <Box component={Paper}>
          <Box p={2}>
            {children}
          </Box>
        </Box>
      </If>
      <Box position="fixed" top={fabTop} left={fabLeft}>
        <Fab
          onClick={() => setShow(!show)}
          size="small"
          color="primary"
        >
          {icon}
        </Fab>
      </Box>
    </>
  )
}

Hideaway.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Hideaway;
