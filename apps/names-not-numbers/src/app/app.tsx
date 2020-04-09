import React from 'react';

import { Container, CssBaseline, ThemeProvider, Theme, createMuiTheme, Typography } from '@material-ui/core';
import { environment } from '../environments/environment';
import Names from './Names';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const withContainer = (Component: React.ComponentType) => () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Component />
      </Container>
    </ThemeProvider>
  );
}

export const App = withContainer(() => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <>
      <Names/>
    </>
  );
});

export default App;