import { useState, useEffect, } from 'react';
import { useMediaQuery, } from '@material-ui/core';
import { storage, } from './storage';

export const useDarkMode = () => {
  // if no stored theme pref, store os theme pref and use that
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const pref = storage.themePref() as any;
  // const mode = pref || (prefersDarkMode ? 'dark' : 'light');
  // storage.themePref(mode);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  // useEffect(() => {
  // }, [isDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode,
  }
}