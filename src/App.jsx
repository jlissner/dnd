import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import CanvasMenu from './CanvasMenu';
import GameBoard from './GameBoard';
import PlayerList from './PlayerList';
import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <div style={{padding: 32, paddingTop: 32 + 56, height: '100%' }}>
        <Grid container spacing={4} alignItems="stretch" style={{ height: '100%' }}>
          <Grid item xs={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PlayerList />
              </Grid>
              <Grid item xs={12}>
                <CanvasMenu />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <GameBoard />
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
