import React from 'react';
import {
  CssBaseline, ThemeProvider,
  createMuiTheme, makeStyles, Box,
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

const withTheme = (Component: React.ComponentType) => () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component />
    </ThemeProvider>
  );
}

export const App = withTheme(() => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  const styles = useStyles();
  return (
    <>
      <Board/>
    </>
  );
});

const width = 25;
const height = 25;
const Board = () => {
  return <>
    {range(width).map(i => (
      <GridRow key={i}>
        {range(height).map(j => <GridItem key={i+'.'+j}/>)}
      </GridRow>
    ))}
  </>;
}
const GridRow = (props: {children: any}) => 
  <Box display="flex" {...props}/>

const GridItem = () => 
  <Box className={useStyles().tile}/>

export default App;