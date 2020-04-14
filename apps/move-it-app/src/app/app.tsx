import React from 'react';
import {
  CssBaseline, ThemeProvider,
  createMuiTheme, makeStyles, Box,
} from '@material-ui/core';
import Backend from 'react-dnd-html5-backend';
import { useDrag, DndProvider } from 'react-dnd';

import { range } from '@parm/util';
import './app.scss';
import { useGridState } from './hooks';
import { It, Block, Tile }  from './objects';


const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const tileColor = 'gray';
const itColor = 'rgb(71, 193, 71)';
const itBorderColor = 'rgb(133, 238, 133)';
export const useStyles = makeStyles(theme => ({
  it: {
    height: '10em',
    width: '10em',
    backgroundColor: itColor,
    position: 'relative',
    borderRadius: '.5em',
    borderColor: itBorderColor,
  },
  tile: {
    height: '10em',
    width: '10em',
    backgroundColor: tileColor,
    position: 'relative',
    // borderRadius: '.5em',
    // margin: theme.spacing(1),
  },
  grid: {
    backgroundColor: tileColor,
  }
}));

const withTheme = (Component: React.ComponentType) => () => {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={Backend} >
        <CssBaseline />
        <Component />
      </DndProvider>
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
  const styles = useStyles();
  return <Box className={styles.grid} >
    {range(width).map(i => (
      <GridRow key={i}>
        {range(height).map(j => <GridItem x={i} y={j} key={i+'.'+j}/>)}
      </GridRow>
    ))}
  </Box>;
}
const GridRow = (props: {children: any}) => 
  <Box display="flex" {...props}/>

const GridItem = (props: {x: number, y: number}) => {
  const { x, y } = props;
  const styles = useStyles();
  const { state } = useGridState();
  if (x === state.it.x && y === state.it.y)
    return (
      <ItObject/>
    );
  return (
    <Box className={styles.tile} />
  );
}

const ItObject = () => {
  const styles = useStyles();
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: It },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <span 
      key="it"
      ref={dragRef}
    >
      <Box
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        border={10}
        className={styles.it}
      />
    </span>
  );
}

export default App;