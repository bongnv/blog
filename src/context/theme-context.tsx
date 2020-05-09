import React from "react";

const LIGHTS_OUT = "lights-out";

const getInitialDarkMode = (): boolean => {
  const darkMode = window.localStorage.getItem(LIGHTS_OUT);
  if (darkMode === "true") {
    return true;
  }

  if (darkMode === "false") {
    return false;
  }

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  if (typeof mql.matches === "boolean") {
    return mql.matches;
  }

  return false;
};

const defaultContext = {
  darkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkMode: (_: boolean): void => {},
};

export const ThemeContext = React.createContext(defaultContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [darkMode, setDarkModeState] = React.useState(getInitialDarkMode());
  document.documentElement.toggleAttribute(LIGHTS_OUT, darkMode);

  const setDarkMode = (mode: boolean): void => {
    setDarkModeState(mode);
    document.documentElement.toggleAttribute(LIGHTS_OUT, mode);
    window.localStorage.setItem(LIGHTS_OUT, mode ? "true" : "false");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
