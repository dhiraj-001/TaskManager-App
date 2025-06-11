import React, {createContext, useState, ReactNode} from 'react';
import {useColorScheme} from 'react-native';

interface ThemeColors {
  bgColor: string;
  Headtext: string;
  Bodytext: string;
  primary: string;
  secondary: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  toggleTheme: () => {},
  colors: {
    bgColor: '#fafaff',
    Headtext: '#6650a5',
    Bodytext: '#635a71',
    primary: '#7d5361',
    secondary: '#b2271e',
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme: ThemeContextType = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
    colors: {
      bgColor: isDarkMode ? '#1c1b26' : '#fafaff',
      Headtext: isDarkMode ? '#d0bcff' : '#6650a5',
      Bodytext: isDarkMode ? '#ccc3dd' : '#635a71',
      primary: isDarkMode ? '#eeb9c8' : '#7d5361',
      secondary: isDarkMode ? '#f2b8b5' : '#b2271e',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}; 