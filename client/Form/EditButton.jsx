import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Fab,
  Fade,
} from '@material-ui/core';
import { Fa } from '../utils';

const useStyles = makeStyles(( theme ) => ({
  editButton: {
    position: 'absolute',
    top: size => theme.spacing(size / -2),
    right: size => theme.spacing(size / -2),
    height: size => theme.spacing(size),
    minHeight: 0,
    width: size => theme.spacing(size),
    zIndex: 100,
  },
  editIcon: {
    fontSize: size => theme.spacing(size / 2),
  },
}));

function EditButton({ children, size, ...props }) {
  const classes = useStyles(size);
  const [hovering, setHovering] = useState(false);

  return (
    <Box
      position="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Fade in={hovering}>
        <Fab className={classes.editButton} color="primary" {...props}>
          <Fa icon="pencil" size="xs" />
        </Fab>
      </Fade>
      {children}
    </Box>
  )
}

EditButton.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
};

EditButton.defaultProps = {
  size: 3,
};

export default EditButton;
