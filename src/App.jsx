import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Chat from './Chat';
import CanvasMenu from './CanvasMenu';
import GameBoard from './GameBoard';
import PlayerList from './PlayerList';
import theme from './theme';
import useGameBoard from './hooks/useGameBoard';
import axios from 'axios';

function App() {
  const gameBoard = useGameBoard();

  axios.get('/ping').then(res => console.log(res))

  return (
    <MuiThemeProvider theme={theme}>
      <Header />

      <Box p={4} mt={11} height="100%">
        <GameBoard gameBoard={gameBoard}/>

        <Box height="100%" width="25%" position="relative" zIndex="1">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PlayerList gameBoard={gameBoard} />
            </Grid>
            <Grid item xs={12}>
              <CanvasMenu />
              <Chat />
              <Chat />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default hot(App);
