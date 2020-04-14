import { useState, useEffect, useCallback } from 'react';
import uuidv1 from 'uuid/v1';

interface GridItem {
  x: number;
  y: number;
}
interface It extends GridItem {
}
interface Block extends GridItem {
}

interface GridState {
  blocks: Block[];
  it: It;
}

const intialGridState: GridState = {
  it: { x: 2, y: 2 },
  blocks: [],
};

interface GridStateHook {
  state: GridState;
  refreshData: () => void;
  setItState: (it: It) => void;
}

export function useGridState(): GridStateHook {
  const [state, setState] = useState({...intialGridState});
  const setItState = (it: It) => setState({...state, it});
  const [guid, setGuid] = useState(uuidv1());
  const refreshData = useCallback(() => {
    setGuid(uuidv1());
    setState({...state});
  }, [guid]);
  useEffect(() => {
  }, [guid]);
  return {
    state,
    refreshData,
    setItState,
  }
}