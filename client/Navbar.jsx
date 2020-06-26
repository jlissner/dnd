import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Fa } from './utils';
import { useGlobalState } from './hooks';

const useStyles = makeStyles((theme) => ({
  title: {
		padding: theme.spacing(1)
	},
}));

function Navbar({ user }) {
  const [, setSelectedCharacter] = useGlobalState('selectedCharacter');
  const [menu, setMenu] = useState(null);
  const classes = useStyles();

  function clearSelectedCharater() {
    setSelectedCharacter(0);
    setMenu(null);
  }

  function renderActions() {
    if (!user) {
      return null;
    }

    if (!user.name) {
      return <Button color="inherit" href="/auth/google">Login</Button>;
    }

    return (
      <>
        <IconButton color="inherit" onClick={(evt) => setMenu(evt.target)}><Fa icon="user-circle" /></IconButton>
        <Menu open={Boolean(menu)} onClose={() => setMenu(null)} anchorEl={menu}>
          <MenuItem onClick={clearSelectedCharater}>Change Character</MenuItem>
          <MenuItem href="/auth/logout" component="a">Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title} variant="h6" component="h1">
        	RPG Together
        </Typography>
        
        <Box ml='auto'>
          {renderActions()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape(),
};

Navbar.defaultProps = {
  user: null,
};

export default Navbar;
