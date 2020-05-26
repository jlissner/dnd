import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Navbar from './Navbar' ;
import { useUser } from './hooks';
import {
  Admin,
  Home,
} from './Pages';

function App() {
  const { user } = useUser(true);

  function renderContent() {
    if (!user) {
      return <Grid container justify="center"><CircularProgress /></Grid>
    }

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
      <Box p={4} mt={11} height="100%">
        {renderContent()}
      </Box>
    </>
  );
}

export default hot(App);
