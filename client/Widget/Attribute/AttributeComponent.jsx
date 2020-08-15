import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import { getNumericPrefix, Popover, Scrollbars } from '../../utils';
import EditableNotePad from '../../EditableNotePad';
import useAttribute from './useAttribute';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '4px 4px 0 0',
  },
  modifier: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

function AttributeComponent({ id }) {
  const {
    attribute,
    modifier,
    updateNotes,
    notes,
  } = useAttribute(id);
  const classes = useStyles();
  const [element, setElement] = useState(null);
  const ref = useRef(null);

  return (
    <Box
      position="relative"
      pb={3}
      height={1}
      display="flex"
      flexDirection="column"
    >
      <Box
        height={1}
        borderRadius="borderRadius"
        boxShadow={1}
        display="flex"
        flexDirection="column"
        className={classes.wrapper}
        ref={ref}
      >
        <Button
          className={classes.button}
          color="primary"
          fullWidth
          variant="contained"
          onClick={() => setElement(ref.current)}
        >
          {attribute.name}
        </Button>
        <Box
          width={1}
          bgcolor="grey.200"
          className="content-header"
          height={1}          
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <Typography align="center">{attribute.value}</Typography>
        </Box>
        <Box bgcolor="primary.main" borderRadius="0 0 4px 4px" p={1} />
      </Box>
      <Box
        border={1}
        borderColor="rgba(0, 0, 0, 0.42)"
        display="flex"
        boxShadow={1}
        p={.5}
        justifyContent="center"
        alignItems="center"
        className={classes.modifier}
        bgcolor="grey.200"
        borderRadius="50%"
        bottom={0}
        left={0}
        right={0}
        mx="auto"
        position="absolute"
        textAlign="center"
      >
        <Typography align="center">{`${getNumericPrefix(modifier.value)}${modifier.value}`}</Typography>
      </Box>
      <Popover
        element={element}
        handleClose={() => setElement(null)}
      >
        <Box height={300} width={300} display="flex" flexDirection="column">
          <Box p={2}>
            <Typography>Notes:</Typography>
          </Box>
          <Divider />
          <Scrollbars>
            <Box p={2} height={1}>
              <EditableNotePad
                notes={notes}
                onSave={updateNotes}
              />
            </Box>
          </Scrollbars>
        </Box>
      </Popover>
    </Box>
  );
}

AttributeComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AttributeComponent;
