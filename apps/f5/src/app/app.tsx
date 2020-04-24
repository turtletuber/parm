import React from 'react';

import { Container, CssBaseline, ThemeProvider, Theme, createMuiTheme, Typography } from '@material-ui/core';
import Adventure from './Adventure';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

const withContainer = (Component: React.ComponentType) => () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
    <Adventure />
  );
});

export default App;