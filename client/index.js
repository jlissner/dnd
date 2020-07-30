import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CharacterBookSkeleton } from './CharacterBook';
import App from './App';
import theme from './theme';
import '@fortawesome/fontawesome-pro/js/all';
import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

ReactDOM.render((
  <BrowserRouter>
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        <React.Suspense fallback={<CharacterBookSkeleton />}>
          <App />
        </React.Suspense>
      </MuiThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
), document.getElementById('root'));
