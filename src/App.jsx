import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Header from './Header';
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

      <div style={{ height: '100%', padding: 32, paddingTop: 56 + 32 }}>
        <GameBoard gameBoard={gameBoard}/>

        <div style={{ height: '100%', width: '25%', position: 'relative', zIndex: 1, }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PlayerList gameBoard={gameBoard} />
            </Grid>
            <Grid item xs={12}>
              <CanvasMenu />
            </Grid>
          </Grid>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
