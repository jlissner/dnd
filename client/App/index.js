import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme';
import AddWidgetModal from '../AddWidgetModal';
import AppComponent from './AppComponent';
import AppSkeleton from './AppSkeleton';
import EditPageModal from '../EditPageModal';
import GlobalPopover from '../GlobalPopover';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>
          <React.Suspense fallback={<AppSkeleton />}>
            <AddWidgetModal />
            <EditPageModal />
            <AppComponent />
            <GlobalPopover />
          </React.Suspense>
        </MuiThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default hot(App);
