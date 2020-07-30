import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { userState } from '../state';
import Navbar from './Navbar' ;
import {
  Admin,
  Home,
} from '../Pages';


function AppComponent() {
  const user = useRecoilValue(userState);

  function renderContent() {
    if (!user.name) {
      return (
        <Grid container justify="center">
          <Paper>
            <Box p={2} maxWidth={800}>
              <Typography variant="h2">Welcome to RPG Together</Typography>
              <Box my={2}>
                <Typography>Log in with Google to continue!</Typography>
              </Box>
              <Grid container justify="flex-end">
                <Button color="primary" href="/auth/google" variant="contained">Login</Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      );
    }

    return (
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Admin} exact path="/admin" />
      </Switch>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <Box p={4} mt="64px" height="calc(100% - 64px)">
        {renderContent()}
      </Box>
    </>
  );
}

export default hot(AppComponent);
