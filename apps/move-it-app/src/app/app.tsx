import React from 'react';
import {
  Container, CssBaseline, ThemeProvider,
  Theme, createMuiTheme, makeStyles, Box, Grid 
} from '@material-ui/core';

import { range } from '@parm/util';

import './app.scss';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export const useStyles = makeStyles(theme => ({
  tile: {
    height: '10em',
    width: '10em',
    backgroundColor: 'gray',
    position: 'relative',
    // borderRadius: '.5em',
    // margin: theme.spacing(1),
  },
}));

const withContainer = (Component: React.ComponentType) => () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={false}>
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
      <Board/>
    </>
  );
});

const width = 10;
const height = 10;
const Board = () => {
  return <>
    {range(width).map(i => (
      <GridRow>
        {range(height).map(j => <GridItem />)}
      </GridRow>
    ))}
  </>;
}
const GridRow = (props: {children: any}) => 
  <Box display="flex" {...props}/>

const GridItem = () => 
  <Box className={useStyles().tile}/>

export default App;