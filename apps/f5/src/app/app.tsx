import React from 'react';

import { Container, CssBaseline, ThemeProvider, createMuiTheme, useMediaQuery } from '@material-ui/core';
import Adventure from './Adventure'; 
import { useDarkMode } from './hooks';

const withContainer = (Component: React.ComponentType<any>) => () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  console.log({isDarkMode});
  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Component isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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