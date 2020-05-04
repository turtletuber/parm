import { createMuiTheme } from '@material-ui/core/styles'; 
import { useState, useMemo } from 'react';
import { singletonHook } from 'react-singleton-hook';

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

interface ThemeState {
  isDark: boolean,
  isTop: boolean,
}

const initialThemeState: ThemeState = {
  isDark: false,
  isTop: false,
}

let setThemeState: React.Dispatch<React.SetStateAction<ThemeState>> = () => { throw new Error(`You must call useThemePrefs first.`); };

const useThemeState = singletonHook(initialThemeState, () => {
  const [state, setState] = useState(initialThemeState);
  setThemeState = setState;
  return state;
});

export const useThemePrefs = () => {
  const state = useThemeState();
  const { isDark, isTop } = state;
  const theme = useMemo(() =>
    createMuiTheme({
      palette: {
        type: isDark ? 'dark' : 'light',
      },
      typography: {
        button: {
          textTransform: 'none'
        }
      }
    }), [
      isDark,
      isTop,
    ] 
  );

  const toggleDark = () => setThemeState({
    ...state,
    isDark: !isDark,
  });
  const toggleTop = () => ({
    ...state,
    isTop: !isTop,
  });

  return {
    theme,
    isDark,
    isTop,
    toggleDark,
    toggleTop,
  };
}