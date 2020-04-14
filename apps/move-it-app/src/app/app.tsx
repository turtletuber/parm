import React from 'react';
import {
  CssBaseline, ThemeProvider,
  createMuiTheme, makeStyles, Box,
} from '@material-ui/core';
import TouchBackend from 'react-dnd-touch-backend';
import Backend from 'react-dnd-html5-backend';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { Route, BrowserRouter } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';

import { range } from '@parm/util';
import './app.scss';
import { useGridState, GridState, IIt } from './hooks';
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DndProvider backend={isBrowser ? Backend : TouchBackend} options={{
          enableMouseEvents: true,
          enableKeyboardEvents: true, 
          enableHoverOutsideTarget: true,
        }}>
          <CssBaseline />
          <Component />
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export const App = withTheme(() => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <>
      <Route
        path="/*"
        render={() => <Board/>}
      />
    </>
  );
});

const width = 25;
const height = 25;
const Board = () => {
  const { state, setItState } = useGridState();
  const styles = useStyles();
  return <Box className={styles.grid} >
    {range(width).map(i => (
      <GridRow key={i}>
        {range(height).map(j => (
          <GridItem
            x={i}
            y={j}
            key={i + '.' + j}
            state={state}
            setItState={setItState}
          />
        ))}
      </GridRow>
    ))}
  </Box>;
}
const GridRow = (props: {children: any}) => 
  <Box display="flex" {...props}/>

const GridItem = (props: {x: number, y: number, state: GridState, setItState: (it: IIt) => void }) => {
  const { x, y, setItState, state } = props;
  const styles = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: It,
    drop: () => {
      setItState({ x, y });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  if (x === state.it.x && y === state.it.y)
    return (
      <ItObject/>
    );
  return (
    <span ref={drop}>
      <Box className={styles.tile} /> 
    </span>
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