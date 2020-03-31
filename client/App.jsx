import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Navbar from './Navbar';
import CharacterSheet from './CharacterSheet';
// import CanvasMenu from './CanvasMenu';
import GameBoard from './GameBoard';
import PlayerList from './PlayerList';
import {
  useGameBoard,
  useUser,
} from './hooks';

function App() {
  const gameBoard = useGameBoard();
  const user = useUser(true);

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
      <>
        <GameBoard gameBoard={gameBoard}/>

        <Box width="25%" position="relative" zIndex="1">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PlayerList gameBoard={gameBoard} />
            </Grid>
            <Grid item xs={12}>
              {/* <CanvasMenu /> */}
            </Grid>
          </Grid>
        </Box>
        <Box position="relative" zIndex="1">
          <CharacterSheet id="1" />
        </Box>
      </>
    )
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
